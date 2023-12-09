
import express from 'express';
import session from 'express-session';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { passport } from './passport.js';
import flash from 'express-flash'; 
import cookieParser from 'cookie-parser';
const app = express();
const userAuthRouter = express.Router();
app.use(cookieParser());
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
  secret: process.env.SECRET,
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
userAuthRouter.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login?error=Invalid credentials',
  failureFlash: true
}), (req, res) => {
  console.log('User authenticated:', req.user);
  const userId = req.user._id.toString();

  res.cookie('myUserIdCookie', userId, { sameSite: 'None', secure: true });
  
  const htmlContent = `
    <h1>File Functionality</h1>
    <button><a href="/v1/read"> Read a File </a></button>
    <button><a href="/v1/write"> Write to a File </a></button>
    <button><a href="/v1/delete"> Delete a File </a></button>
    <button><a href="/v1/updateFile"> Update a File </a></button>
    <button><a href="/v1/files"> View Files </a></button>
    <br>
    <h1>User Functionality</h1>
    <button><a href="/v1/api/users"> Display JSON Data </a></button>
    <button><a href="/v1/add"> Add User </a></button>
    <button><a href="/v1/updateUser"> Update User </a></button>
    <button><a href="/v1/deleteUser"> Delete User </a></button>
    <button><a href="/auth/login"> Login </a></button>
    <form action="/auth/logout" method="post" style="display: inline;">
      <button type="submit"> Logout </button>
    </form>
  `;
  res.send(htmlContent);
});


// Add a middleware to handle authentication failures
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
      addedBy, // Set addedBy based on the authentication status
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