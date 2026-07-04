import settingsService from '../services/settingsService.js';
import asyncHandler from '../utils/asyncHandler.js';
import HTTP_STATUS from '../constants/httpStatus.js';

export const getSettings = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;
  const settings = await settingsService.get(organizationId);
  res.status(HTTP_STATUS.OK).json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;
  const settings = await settingsService.updateThreshold(
    organizationId,
    req.body.defaultLowStockThreshold
  );
  res.status(HTTP_STATUS.OK).json({ success: true, data: settings });
});

export default { getSettings, updateSettings };
