import { Router } from 'express';
import { getName, login, register, checkLogged, logout } from '../controller/AuthController';
import { auth } from '../middleware/auth';
import { valiDateLogin, validateRegistration, validateProfileUpdate, validatePasswordChange } from '../middleware/UserValidation';

const router = Router();

router.post('/login',valiDateLogin, login);
router.post('/register',validateRegistration, register);
router.get('/name', auth, getName);
router.get('/check', checkLogged);
router.get('/logout',auth,logout);

export default router;
