import { Router } from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { signupValidator, loginValidator } from '../validators/authValidators.js';
import validateRequest from '../middlewares/validateRequest.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', signupValidator, validateRequest, signup);
router.post('/login', loginValidator, validateRequest, login);
router.get('/me', authMiddleware, getMe);

export default router;
