import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { generateToken, verifyToken } from "../../utils/jwt";

export const handleAuthCallback = (req: Request, res: Response) => {
  
  const user = req.user as User;

  if (!user) {
    return res.redirect("http://localhost:3000/login?error=auth_failed");
  }

  const token = generateToken({ id: user._id},"7d"); 

  // Send token back to frontend
  res.redirect(`http://localhost:3000/auth/success?token=${token}`);
};
