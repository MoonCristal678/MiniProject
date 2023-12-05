
import express from 'express';
import session from 'express-session';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { passport } from './passport.js';
import flash from 'express-flash'; 

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
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

     
      return res.redirect('/');
    });
  })(req, res, next);
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

    
    const existingUser = await UserAuth.findOne({ username });
    const existingEmail = await UserAuth.findOne({ email });

    if (existingUser) {
      return res.render('register.ejs', { errorMessage: 'Username is already taken. Please choose a different one.' });
    }else if(existingEmail){
      return res.render('register.ejs', {errorMessage: 'An email is already associated with this account please login or choose a different email.'})
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

    
      res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
  }
);


export { UserAuth, userAuthRouter };