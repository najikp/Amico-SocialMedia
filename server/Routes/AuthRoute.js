import express from 'express'
import { forgotOtp, forgotPassword, loginUser, registerUser, sendOtp } from '../Controllers/AuthController.js';
const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/send-otp',sendOtp)
router.post('/otp-send',forgotOtp)
router.put('/forgot-pass',forgotPassword)

export default router