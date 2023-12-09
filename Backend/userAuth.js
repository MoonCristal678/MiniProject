
import express from 'express';
import session from 'express-session';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { passport } from './passport.js';
import flash from 'express-flash'; 
import cookieParser from 'cookie-parser';

const userAuthRouter = express.Router();

const userAuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
  
})
userAuthSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const UserAuth = mongoose.model('UserAuth', userAuthSchema);


userAuthRouter.use(flash());

userAuthRouter.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000, 
  }
}));
userAuthRouter.use(passport.initialize());
userAuthRouter.use(passport.session());

userAuthRouter.get('/login', (req, res) => {
  const errorMessage = req.query.error; 
  res.render('login.ejs', { errorMessage });
}); 
userAuthRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    
    // Check if the user exists
    if (!user) {
      // If the request is an API request, send JSON response
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // If it's a regular browser request, redirect to the login page with an error query parameter
      return res.redirect('/auth/login?error=Invalid credentials');
    }

    // Now, check if the password is valid
    req.logIn(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      const isPasswordValid = await user.verifyPassword(req.body.password);

      if (!isPasswordValid) {
        // If the request is an API request, send JSON response
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If it's a regular browser request, redirect to the login page with an error query parameter
        return res.redirect('/auth/login?error=Invalid credentials');
      }

      // If the request is an API request, send a success JSON response
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.json({ message: 'Login successful', userId: user._id });
      }

      // If it's a regular browser request, redirect to the root URL
      return res.redirect('/');
    });
  })(req, res, next);
});


userAuthRouter.use('/login', (err, req, res, next) => {
  if (err) {
    // Handle authentication failures here
    res.status(401).json({ error: 'Invalid credentials' });
  } else {
    // Continue to the next middleware if no error occurred
    next();
  }
});

// Logout route
userAuthRouter.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).send('Internal Server Error');
    } else {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/auth/login');
        }
      });
    }
  });
});



userAuthRouter.get('/register', (req, res) => {
  res.render('register.ejs'); 
});

userAuthRouter.post(
  '/register',
  [
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    // Check if a user is authenticated
    const addedBy = req.isAuthenticated() ? req.user._id : null;

    const existingUser = await UserAuth.findOne({ username });
    const existingEmail = await UserAuth.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken. Please choose a different one.' });
    } else if (existingEmail) {
      return res.status(400).json({ error: 'An email is already associated with this account. Please login or choose a different email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserAuth = new UserAuth({
      username,
      password: hashedPassword,
      email,
     
    });

    try {
      await newUserAuth.save();
      res.json({ message: 'User registered successfully', user: newUserAuth });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
  }
);






export { UserAuth, userAuthRouter };