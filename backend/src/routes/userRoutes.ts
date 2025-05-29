import { Router } from "express";
import { auth } from "../middleware/auth";
import { validatePasswordChange, validateProfileUpdate } from "../middleware/UserValidation";
import { changePassword, getProfile, updateProfile } from "../controller/UserController";

const router = Router();
router.get('/profile', auth, getProfile);
router.put('/profile', auth, validateProfileUpdate, updateProfile);
router.put('/password', auth, validatePasswordChange, changePassword);

export default router;