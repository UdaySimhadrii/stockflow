import { verifyToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';
import HTTP_STATUS from '../constants/httpStatus.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new AppError('Authentication required. Please log in.', HTTP_STATUS.UNAUTHORIZED);
    }

    const decoded = verifyToken(token);
    req.user = {
      userId: decoded.userId,
      organizationId: decoded.organizationId,
    };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Session expired. Please log in again.', HTTP_STATUS.UNAUTHORIZED));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid authentication token.', HTTP_STATUS.UNAUTHORIZED));
    }
    next(err);
  }
};

export default authMiddleware;
