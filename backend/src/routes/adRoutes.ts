import { Router } from 'express';
import { createAd, filterSearch, getAds, getUserAds, updateAd, deleteAd } from '../controller/AdController';
import { singleAd } from '../controller/AdController';
import { validateAdCreation } from '../middleware/AdValidation';

const router = Router();
router.get('/filter',filterSearch);
router.get('/user', getUserAds);
router.post('/create',validateAdCreation, createAd);
router.put('/:id',validateAdCreation, updateAd);
router.delete('/:id', deleteAd);
router.get('/', getAds);
router.get('/:id', singleAd);
export default router;
