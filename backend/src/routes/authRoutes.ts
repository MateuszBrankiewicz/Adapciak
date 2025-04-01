import { Router } from 'express';
import { getName, login, register, checkLogged, logout } from '../controller/AuthController';
import { auth } from '../middleware/auth';
import { valiDateLogin } from '../middleware/UserValidation';

const router = Router();

router.post('/login',valiDateLogin, login);
router.post('/register', register);
router.get('/name', auth, getName);
router.get('/check', checkLogged);
router.get('/logout',logout);
export default router;
