import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import dotenv from 'dotenv';


app.use(session({ secret: process.env.SECRET || 'fallback-secret-key', resave: true, saveUninitialized: true, cookie: {
  maxAge: 30 * 60 * 1000, 
} }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
    new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
      try {
        const user = await UserAuth.findOne({ username });
  
        if (!user) {
          return done(null, false, { message: 'No such user found.' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  