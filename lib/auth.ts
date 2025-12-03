import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

if (!process.env.JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in environment variables");
}

const SECRET = process.env.JWT_SECRET;

// Token interface
export interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
  role: "user" | "doctor" | "admin";
}

// Create JWT token
export const createToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

// Verify JWT token
export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded === "string") return null;
    return decoded as DecodedToken;
  } catch (err) {
    return null;
  }
};

// Hash password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};
