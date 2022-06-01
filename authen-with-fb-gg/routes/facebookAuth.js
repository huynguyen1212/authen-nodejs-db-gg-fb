const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("../config/facebookData");
const user = require("../model/user");

module.exports = function (passport) {
  // Passport session setup.
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  console.log("config: ", config.facebook_api_key);

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url,
      },
      (accessToken, refreshToken, profile, done) => {
        // find if a user exist with this email or not

        user.findOne({ facebookId: profile.id }).then((data) => {
          if (data) {
            console.log("exist");
            return done(null, data);
          } else {
            console.log("not exist");
            console.log("profile: ", profile);
            user({
              username: profile.displayName,
              facebookId: profile.id,
              password: null,
              provider: "facebook",
              isVerified: true,
            }).save(function (err, data) {
              return done(null, data);
            });
          }
        });
      }
    )
  );
};
