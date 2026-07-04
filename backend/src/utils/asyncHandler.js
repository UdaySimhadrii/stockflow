/**
 * Wraps an async Express route handler so any rejected promise
 * is forwarded to the centralized error handler via next().
 * @param {Function} fn - async (req, res, next) => {}
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
