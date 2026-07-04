import organizationRepository from '../repositories/organizationRepository.js';
import AppError from '../utils/AppError.js';
import HTTP_STATUS from '../constants/httpStatus.js';

export const settingsService = {
  async get(organizationId) {
    const organization = await organizationRepository.findById(organizationId);
    if (!organization) {
      throw new AppError('Organization not found.', HTTP_STATUS.NOT_FOUND);
    }
    return {
      organizationId: organization.id,
      organizationName: organization.name,
      defaultLowStockThreshold: organization.defaultLowStockThreshold,
    };
  },

  async updateThreshold(organizationId, defaultLowStockThreshold) {
    const organization = await organizationRepository.findById(organizationId);
    if (!organization) {
      throw new AppError('Organization not found.', HTTP_STATUS.NOT_FOUND);
    }
    organization.defaultLowStockThreshold = defaultLowStockThreshold;
    await organization.save();
    return {
      organizationId: organization.id,
      organizationName: organization.name,
      defaultLowStockThreshold: organization.defaultLowStockThreshold,
    };
  },
};

export default settingsService;
