import dashboardService from '../services/dashboardService.js';
import asyncHandler from '../utils/asyncHandler.js';
import HTTP_STATUS from '../constants/httpStatus.js';

export const getSummary = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;
  const summary = await dashboardService.getSummary(organizationId);
  res.status(HTTP_STATUS.OK).json({ success: true, data: summary });
});

export default { getSummary };
