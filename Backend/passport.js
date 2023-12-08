import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import { UserAuth } from './userAuth.js'; 

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      const user = await UserAuth.findOne({ username });
      if (!user || !(await user.verifyPassword(password))) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserAuth.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
export { passport };
