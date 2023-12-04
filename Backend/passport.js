// passport-config.js
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import { UserAuth } from './userAuth.js'; // Adjust the path

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

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    console.log('Attempting to authenticate:', username, password);

    const user = await UserAuth.findOne({ username });

    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect username.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect password.' });
    }

    console.log('Authentication successful');
    return done(null, user);
  } catch (error) {
    console.error('Error during authentication:', error);
    return done(error);
  }
}));

export { passport };
