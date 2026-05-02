const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { prisma } = require('./database-config');

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        // Find user by either Google ID or the associated email
        let user = await prisma.user.findFirst({
          where: {
            OR: [
              { googleId: profile.id },
              ...(email ? [{ email }] : []),
            ],
          },
        });

        if (user) {
          // If user exists without googleId but with matched email, update googleId
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId: profile.id },
            });
          }
        } else {
          // Create a new user
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              name: profile.displayName || 'Google User',
              email: email,
              role: 'CLIENT',
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Configure Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || 'dummy_id',
      clientSecret: process.env.FACEBOOK_APP_SECRET || 'dummy_secret',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        let user = await prisma.user.findFirst({
          where: {
            OR: [
              { facebookId: profile.id },
              ...(email ? [{ email }] : []),
            ],
          },
        });

        if (user) {
          if (!user.facebookId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { facebookId: profile.id },
            });
          }
        } else {
          user = await prisma.user.create({
            data: {
              facebookId: profile.id,
              name: profile.displayName || 'Facebook User',
              email: email,
              role: 'CLIENT',
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;