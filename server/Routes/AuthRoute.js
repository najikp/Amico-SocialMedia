import express from 'express'
import { loginUser, registerUser, sendOtp } from '../Controllers/AuthController.js';
const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/send-otp',sendOtp)

export default router