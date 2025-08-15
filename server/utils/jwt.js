import jwt from "jsonwebtoken";

/**
 * Generate JWT token for a user
 * @param {Object} payload - user data to embed in token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1d",
  });
};

/**
 * Verify JWT token and return decoded payload
 * @param {string} token - JWT token string
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
