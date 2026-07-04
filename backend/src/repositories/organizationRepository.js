import { Organization } from '../models/index.js';

export const organizationRepository = {
  create(data, options = {}) {
    return Organization.create(data, options);
  },

  findById(id) {
    return Organization.findByPk(id);
  },

  updateThreshold(id, defaultLowStockThreshold) {
    return Organization.update(
      { defaultLowStockThreshold },
      { where: { id }, returning: true }
    );
  },
};

export default organizationRepository;
