import { Router } from "express";
import passport from "../../config/passport";
import { handleAuthCallback } from "./auth.controller";

const router = Router();

// Google routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }), handleAuthCallback);

// Facebook routes
router.get("/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));

router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "http://localhost:3000/login" }), handleAuthCallback);

export default router;
