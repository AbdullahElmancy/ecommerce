import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from "passport-facebook";
import ENV from "./env";
import userModel,{ IUser } from "../modules/user/user.model";
import { addUserService, findByIdService, findUserService } from "../modules/user/user.service";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findByIdService(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_AUTH as string,
      clientSecret: ENV.GOOGLE_CLIENT_AUTH_SECRET as string,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken: string, refreshToken: string, profile: GoogleProfile, done) => {
      try {
        
        if(!profile.emails?.[0].value) return done(null, false)
        let user = await findUserService(profile.emails?.[0].value)
        
        if (!user) {
          user = await addUserService({
            provider: "google",
            providerId: profile.id,
            first_name: profile.displayName?.split(" ")[0],
            last_name: profile.displayName?.split(" ")[1],
            email: profile.emails?.[0].value,
            avatar: profile.photos?.[0].value,
          })
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: ENV.FB_CLIENT_ID as string,
      clientSecret: ENV.FB_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/api/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (accessToken: string, refreshToken: string, profile: FacebookProfile, done) => {
      try {
        let user = await userModel.findOne({ providerId: profile.id, provider: "facebook" });

        if (!user) {
          user = await userModel.create({
            provider: "facebook",
            providerId: profile.id,
            name: `${profile.name?.givenName} ${profile.name?.familyName}`,
            email: profile.emails?.[0].value,
            avatar: profile.photos?.[0].value,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
