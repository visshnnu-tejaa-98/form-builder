import crypto, { randomBytes, createHmac } from "crypto";

export const createSalt = () => randomBytes(16).toString("hex");

export const hashPassword = (salt: string, password: string) => {
  return createHmac("sha256", salt).update(password).digest("hex");
};
