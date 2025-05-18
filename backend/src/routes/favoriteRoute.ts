import { Router } from 'express';
import { checkFavorite, deleteFavorites, getFavorites, postFavorites } from '../controller/FavoriteController';
const router = Router();
router.get('/:id', getFavorites)
router.post('/',postFavorites);
router.delete('/:id',deleteFavorites)
router.get('/check/:id',checkFavorite)
export default router;