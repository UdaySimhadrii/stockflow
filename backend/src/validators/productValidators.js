import { body, param, query } from 'express-validator';

const ensureSellingPriceNotBelowCost = (value, { req }) => {
  const costPrice = req.body.costPrice;
  if (value === undefined || value === null || value === '') {
    return true;
  }

  if (costPrice === undefined || costPrice === null || costPrice === '') {
    return true;
  }

  const costValue = Number(costPrice);
  const sellingValue = Number(value);
  if (!Number.isNaN(costValue) && sellingValue < costValue) {
    throw new Error('Selling price should be greater than or equal to cost price.');
  }
  return true;
};

export const createProductValidator = [
  body('name').trim().notEmpty().withMessage('Product name is required.'),
  body('sku').trim().notEmpty().withMessage('SKU is required.'),
  body('description').optional({ checkFalsy: true }).trim(),
  body('quantityOnHand')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity on hand must be a non-negative integer.'),
  body('costPrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a non-negative number.'),
  body('sellingPrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Selling price must be a non-negative number.')
    .custom(ensureSellingPriceNotBelowCost),
  body('lowStockThreshold')
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage('Low stock threshold must be a non-negative integer.'),
];

export const updateProductValidator = [
  param('id').isInt().withMessage('Invalid product id.'),
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty.'),
  body('sku').optional().trim().notEmpty().withMessage('SKU cannot be empty.'),
  body('description').optional({ checkFalsy: true }).trim(),
  body('quantityOnHand')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity on hand must be a non-negative integer.'),
  body('costPrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a non-negative number.'),
  body('sellingPrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Selling price must be a non-negative number.')
    .custom(ensureSellingPriceNotBelowCost),
  body('lowStockThreshold')
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage('Low stock threshold must be a non-negative integer.'),
];

export const productIdValidator = [param('id').isInt().withMessage('Invalid product id.')];

export const listProductsValidator = [
  query('search').optional().trim(),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  query('pageSize')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Page size must be between 1 and 100.'),
];

export default {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
  listProductsValidator,
};
