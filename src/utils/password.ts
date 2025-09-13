import bcrypt from "bcryptjs";
import ENV from "../config/env";
import crypto from "crypto";
export const hashPassword = async (password: string): Promise<string> => {
  const saltRound = await bcrypt.genSalt(Number(ENV.SALT_ROUNDS));
  return bcrypt.hash(password, saltRound);
};

export const comparePasswords = async (
  plainPassword: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const createPasswordRestToken = ()=>{
  const restToken = crypto.randomBytes(32).toString("hex");
  const passwordRestToken = crypto.createHash("sha256").update(restToken).digest("hex");
  return passwordRestToken
}

export const passwordExpires = ()=>{
  return new Date(Date.now() + 30 * 60 * 1000);
}