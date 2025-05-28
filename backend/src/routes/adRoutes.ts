import { Router } from 'express';
import { createAd, filterSearch, getAds, getUserAds, updateAd } from '../controller/AdController';
import { singleAd } from '../controller/AdController';

const router = Router();
router.get('/filter',filterSearch);
router.get('/user', getUserAds);
router.post('/create', createAd);
router.put('/:id', updateAd);
router.get('/', getAds);
router.get('/:id', singleAd);
export default router;
