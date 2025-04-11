import { Router } from 'express';
import { createAd, getAds } from '../controller/AdController';

const router = Router();

router.post('/create', createAd);
router.get('/', getAds);
export default router;
