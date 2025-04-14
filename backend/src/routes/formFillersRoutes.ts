import { Router } from 'express';
import { getVoivodeships } from '../controller/formFillersController';
const router = Router();    

router.get('/voivodeships', getVoivodeships);
export default router;