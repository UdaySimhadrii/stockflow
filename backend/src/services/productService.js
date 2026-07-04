import productRepository from '../repositories/productRepository.js';
import AppError from '../utils/AppError.js';
import HTTP_STATUS from '../constants/httpStatus.js';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

const serializeProduct = (product) => ({
  id: product.id,
  organizationId: product.organizationId,
  name: product.name,
  sku: product.sku,
  description: product.description,
  quantityOnHand: product.quantityOnHand,
  costPrice: product.costPrice !== null ? Number(product.costPrice) : null,
  sellingPrice: product.sellingPrice !== null ? Number(product.sellingPrice) : null,
  lowStockThreshold: product.lowStockThreshold,
  lastUpdatedBy: product.lastUpdatedBy,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

export const productService = {
  async list(organizationId, { search, page = 1, pageSize = DEFAULT_PAGE_SIZE } = {}) {
    const safePage = Math.max(1, parseInt(page, 10) || 1);
    const safePageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE));
    const offset = (safePage - 1) * safePageSize;

    const { rows, count } = await productRepository.findAllByOrg(organizationId, {
      search,
      limit: safePageSize,
      offset,
    });

    return {
      products: rows.map(serializeProduct),
      pagination: {
        page: safePage,
        pageSize: safePageSize,
        total: count,
        totalPages: Math.ceil(count / safePageSize) || 1,
      },
    };
  },

  async getById(organizationId, productId) {
    const product = await productRepository.findByIdAndOrg(productId, organizationId);
    if (!product) {
      throw new AppError('Product not found.', HTTP_STATUS.NOT_FOUND);
    }
    return serializeProduct(product);
  },

  async create(organizationId, userId, data) {
    const existing = await productRepository.findBySkuAndOrg(data.sku, organizationId);
    if (existing) {
      throw new AppError(
        `A product with SKU "${data.sku.toUpperCase()}" already exists in your organization.`,
        HTTP_STATUS.CONFLICT
      );
    }

    const product = await productRepository.create({
      organizationId,
      name: data.name,
      sku: data.sku,
      description: data.description ?? null,
      quantityOnHand: data.quantityOnHand ?? 0,
      costPrice: data.costPrice ?? null,
      sellingPrice: data.sellingPrice ?? null,
      lowStockThreshold: data.lowStockThreshold ?? null,
      lastUpdatedBy: userId,
    });

    return serializeProduct(product);
  },

  async update(organizationId, userId, productId, data) {
    const product = await productRepository.findByIdAndOrg(productId, organizationId);
    if (!product) {
      throw new AppError('Product not found.', HTTP_STATUS.NOT_FOUND);
    }

    if (data.sku && data.sku.toUpperCase() !== product.sku) {
      const existing = await productRepository.findBySkuAndOrg(data.sku, organizationId);
      if (existing) {
        throw new AppError(
          `A product with SKU "${data.sku.toUpperCase()}" already exists in your organization.`,
          HTTP_STATUS.CONFLICT
        );
      }
    }

    const updated = await productRepository.update(product, {
      ...data,
      lastUpdatedBy: userId,
    });

    return serializeProduct(updated);
  },

  async remove(organizationId, productId) {
    const product = await productRepository.findByIdAndOrg(productId, organizationId);
    if (!product) {
      throw new AppError('Product not found.', HTTP_STATUS.NOT_FOUND);
    }
    await productRepository.delete(product);
    return { id: productId };
  },
};

export { serializeProduct };
export default productService;
