import { body } from 'express-validator';

export const signupValidator = [
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  body('organizationName')
    .trim()
    .notEmpty()
    .withMessage('Organization name is required.'),
  body('name').optional({ checkFalsy: true }).trim(),
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('password').trim().notEmpty().withMessage('Password is required.'),
];

export default { signupValidator, loginValidator };
