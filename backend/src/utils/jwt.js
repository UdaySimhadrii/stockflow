import jwt from 'jsonwebtoken';
import env from '../config/env.js';

/**
 * Sign a JWT for a given user payload.
 * @param {{ userId: number, organizationId: number }} payload
 * @returns {string} signed JWT
 */
export const signToken = (payload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

/**
 * Verify a JWT and return its decoded payload.
 * Throws if invalid or expired.
 * @param {string} token
 */
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

export default { signToken, verifyToken };
