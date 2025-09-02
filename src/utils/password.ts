import bcrypt from "bcryptjs";
import ENV from "../config/env";

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
