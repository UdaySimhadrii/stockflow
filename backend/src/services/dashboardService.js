import productRepository from '../repositories/productRepository.js';
import organizationRepository from '../repositories/organizationRepository.js';

export const dashboardService = {
  async getSummary(organizationId) {
    const [products, organization] = await Promise.all([
      productRepository.findAllRawByOrg(organizationId),
      organizationRepository.findById(organizationId),
    ]);

    const defaultThreshold = organization?.defaultLowStockThreshold ?? 5;

    const totalProducts = products.length;
    const totalQuantityOnHand = products.reduce((sum, p) => sum + p.quantityOnHand, 0);

    const lowStockItems = products
      .filter((p) => {
        const threshold = p.lowStockThreshold ?? defaultThreshold;
        return p.quantityOnHand <= threshold;
      })
      .map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        quantityOnHand: p.quantityOnHand,
        lowStockThreshold: p.lowStockThreshold ?? defaultThreshold,
      }))
      .sort((a, b) => a.quantityOnHand - b.quantityOnHand);

    return {
      totalProducts,
      totalQuantityOnHand,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      defaultLowStockThreshold: defaultThreshold,
    };
  },
};

export default dashboardService;
