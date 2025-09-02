import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import ENV from "../config/env";
import { AppError } from "./AppError";

const JWT_SECRET = ENV.JWT_SECRET || "super_secret_key";

export const generateToken = (payload: object, JWT_EXPIRES_IN: SignOptions["expiresIn"] = "1d" ): string => {
    try {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
        throw new AppError("Failed to generate token", 500);
    }
};
export const generateTokenWithoutExpire = (payload: object): string => {
    try {
        return jwt.sign(payload, JWT_SECRET);
    } catch (error) {
        throw new AppError("Failed to generate token", 500);
    }
};


export const verifyToken = (token: string): string | JwtPayload => {
    try {
          return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new AppError("Failed to verify token", 500);
    }
};

export const decodeToken = (token: string): null | JwtPayload | string => {
  return jwt.decode(token);
};

