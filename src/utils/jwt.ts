import jwt, { Secret } from "jsonwebtoken";
import { config } from '../config/env';

export const generateToken = (userId: string) => {
  const token = jwt.sign(
    { id: userId },             // wrap in object
    config.jwtSecret as Secret, // use env secret
    { expiresIn: "7d", algorithm: "HS256" }
  );

  return token;
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwtSecret as Secret);
};
