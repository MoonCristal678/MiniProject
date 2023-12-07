
import express from 'express';
import session from 'express-session';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { passport } from './passport.js';
import flash from 'express-flash'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
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
  tokens: [{ type: String }],
})


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


userAuthRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
      // Generate and store JWT token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      user.tokens = user.tokens.concat(token);
      await user.save();

      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.redirect('/');
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  })(req, res, next);
});


// Logout route
// Logout route
const sessionSecret = process.env.SESSION_SECRET || 'your-secret-key';

userAuthRouter.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000,
  },
}));

// Move isAuthenticated function definition here
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

userAuthRouter.get('/favicon.ico', (req, res) => res.status(204));

userAuthRouter.post('/logout', isAuthenticated, async (req, res) => {
  try {
    const user = req.user;

    // Remove the JWT token from the tokens array
    user.tokens = user.tokens.filter(token => token !== req.token);
    await user.save();

    // Use req.logOut() instead of req.logout() with a callback function
    req.logOut((err) => {
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
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).send('Internal Server Error');
  }
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

    const existingUser = await UserAuth.findOne({ username });
    const existingEmail = await UserAuth.findOne({ email });

    if (existingUser) {
      return res.render('register.ejs', { errorMessage: 'Username is already taken. Please choose a different one.' });
    } else if (existingEmail) {
      return res.render('register.ejs', { errorMessage: 'An email is already associated with this account. Please login or choose a different email.' });
    }

    const newUserAuth = new UserAuth({
      username,
      password: await bcrypt.hash(password, 10),
      email,
    });

    try {
      // Generate and log the JWT token after newUserAuth is defined
      const token = jwt.sign({ _id: newUserAuth._id }, process.env.JWT_SECRET);
      console.log('Generated Token:', token);

      // Save the token in the userAuth instance
      newUserAuth.tokens = newUserAuth.tokens.concat(token);

      await newUserAuth.save();

      res.json({ message: 'User registered successfully', user: newUserAuth });
    } catch (error) {
      console.error(error);

      res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
  }
);


export { UserAuth, userAuthRouter };