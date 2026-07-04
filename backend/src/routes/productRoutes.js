import { Router } from 'express';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
  listProductsValidator,
} from '../validators/productValidators.js';
import validateRequest from '../middlewares/validateRequest.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', listProductsValidator, validateRequest, listProducts);
router.post('/', createProductValidator, validateRequest, createProduct);
router.get('/:id', productIdValidator, validateRequest, getProduct);
router.put('/:id', updateProductValidator, validateRequest, updateProduct);
router.delete('/:id', productIdValidator, validateRequest, deleteProduct);

export default router;
