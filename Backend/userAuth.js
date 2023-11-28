

import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import session from 'express-session';
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserAuth.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new LocalStrategy(
  async (username, password, done) => {
      const user = await UserAuth.findOne({ username: username });
      if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
  }
));

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

    if (existingUser) {
      return res.render('register.ejs', { errorMessage: 'Username is already taken. Please choose a different one.' });
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



userAuthRouter.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    res.redirect('/auth/login');
  });
});


export { UserAuth, userAuthRouter };
