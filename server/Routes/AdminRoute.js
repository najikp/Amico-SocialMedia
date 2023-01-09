import express from 'express';
import { activateUser, blockUser } from '../Controllers/AdminController.js';

const router=express.Router()

router.put('/block/:id',blockUser);
router.put('/activate/:id',activateUser)

export default router;