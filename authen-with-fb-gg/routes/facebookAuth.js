//app.js
/*config is our configuration variable.*/
passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook_key,
      clientSecret: config.facebook_secret,
      callbackURL: config.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        if (config.use_database) {
          //Further code of Database.
        }
        return done(null, profile);
      });
    }
  )
);
