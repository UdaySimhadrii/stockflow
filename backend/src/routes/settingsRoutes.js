import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { updateSettingsValidator } from '../validators/settingsValidators.js';
import validateRequest from '../middlewares/validateRequest.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getSettings);
router.put('/', updateSettingsValidator, validateRequest, updateSettings);

export default router;
