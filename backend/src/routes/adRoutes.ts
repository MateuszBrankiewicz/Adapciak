import { Router } from 'express';
import { createAd } from '../controller/AdController';

const router = Router();

router.post('/create', createAd);

export default router;
