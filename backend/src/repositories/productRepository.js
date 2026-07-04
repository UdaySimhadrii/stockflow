import { Op } from 'sequelize';
import { Product } from '../models/index.js';

export const productRepository = {
  /**
   * List products for an organization, optionally filtered by search term
   * (matches name or SKU, case-insensitive) and paginated.
   */
  async findAllByOrg(organizationId, { search, limit, offset } = {}) {
    const where = { organizationId };

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { sku: { [Op.like]: `%${search.toUpperCase()}%` } },
      ];
    }

    const { rows, count } = await Product.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: limit ?? undefined,
      offset: offset ?? undefined,
    });

    return { rows, count };
  },

  findByIdAndOrg(id, organizationId) {
    return Product.findOne({ where: { id, organizationId } });
  },

  findBySkuAndOrg(sku, organizationId) {
    return Product.findOne({
      where: { sku: String(sku).trim().toUpperCase(), organizationId },
    });
  },

  create(data) {
    return Product.create(data);
  },

  async update(product, data) {
    return product.update(data);
  },

  async delete(product) {
    return product.destroy();
  },

  /**
   * Fetch all products for an org (used for dashboard aggregation).
   */
  findAllRawByOrg(organizationId) {
    return Product.findAll({ where: { organizationId } });
  },
};

export default productRepository;
