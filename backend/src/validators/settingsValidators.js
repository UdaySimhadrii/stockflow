import { body } from 'express-validator';

export const updateSettingsValidator = [
  body('defaultLowStockThreshold')
    .isInt({ min: 0 })
    .withMessage('Default low stock threshold must be a non-negative integer.'),
];

export default { updateSettingsValidator };
