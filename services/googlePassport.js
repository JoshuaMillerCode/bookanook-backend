import googlePassport from 'passport-google-oauth2';
const GoogleStrategy = googlePassport.Strategy;
import passport from 'passport';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    },
    function (request, accessToken, refreshToken, profile, done) {
      //create user with mongoDB
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });

      //for now
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
