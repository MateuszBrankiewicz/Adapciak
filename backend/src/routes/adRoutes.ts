import { Router } from 'express';
import { createAd, getAds } from '../controller/AdController';
import { singleAd } from '../controller/AdController';

const router = Router();

router.post('/create', createAd);
router.get('/', getAds);
router.get('/:id', singleAd);
export default router;
