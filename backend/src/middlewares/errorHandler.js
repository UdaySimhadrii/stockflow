import HTTP_STATUS from '../constants/httpStatus.js';
import env from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let details = err.details || null;

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    // Make these operational so safe messages are returned
    err.isOperational = true;
    err.message = 'Validation failed.';
    details = err.errors?.map((e) => ({ field: e.path, message: e.message }));
  }

  const message = err.isOperational
    ? err.message || 'Something went wrong. Please try again.'
    : 'Something went wrong. Please try again.';

  if (!err.isOperational && env.nodeEnv === 'development') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { errors: details } : {}),
    ...(env.nodeEnv === 'development' && !err.isOperational ? { stack: err.stack } : {}),
  });
};

export default errorHandler;
