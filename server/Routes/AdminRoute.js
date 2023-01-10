import express from 'express';
import { activateUser, blockUser, getAllPosts } from '../Controllers/AdminController.js';

const router=express.Router()

router.put('/block/:id',blockUser);
router.put('/activate/:id',activateUser)

router.get('/posts',getAllPosts)

export default router;