
import express from 'express';
import session from 'express-session';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { passport } from './passport.js';
import flash from 'express-flash'; 
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import {jwtSecretKey} from './config.js';
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
  },
  token: {
    type: String,
  }
  
})
userAuthSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
userAuthSchema.methods.generateAuthToken = function() {
  return jwt.sign({ userId: this._id }, jwtSecretKey);
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
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

userAuthRouter.get('/login', (req, res) => {
  const errorMessage = req.query.error; 
  res.render('login.ejs', { errorMessage });
}); 
userAuthRouter.post('/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.logIn(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      const isPasswordValid = await user.verifyPassword(req.body.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate and save the token to the user
      const token = user.generateAuthToken();
      user.token = token;
      await user.save();
      
      // Redirect to the root path after successful login
      res.redirect("/");
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
      // Save the user
      await newUserAuth.save();

      // Generate and save the token to the user
      const token = newUserAuth.generateAuthToken();
      newUserAuth.token = token;
      await newUserAuth.save();

      res.json({ message: 'User registered successfully', user: newUserAuth, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
  }
);






export { UserAuth, userAuthRouter };