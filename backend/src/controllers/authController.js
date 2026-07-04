import authService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';
import HTTP_STATUS from '../constants/httpStatus.js';

export const signup = asyncHandler(async (req, res) => {
  const { email, password, name, organizationName } = req.body;
  const result = await authService.signup({ email, password, name, organizationName });
  res.status(HTTP_STATUS.CREATED).json({ success: true, data: result });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  res.status(HTTP_STATUS.OK).json({ success: true, data: result });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.userId);
  res.status(HTTP_STATUS.OK).json({ success: true, data: { user } });
});

export default { signup, login, getMe };
