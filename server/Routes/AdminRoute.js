import express from 'express';
import { activateUser, blockUser, deleteReported, getAllPosts } from '../Controllers/AdminController.js';

const router=express.Router()

router.put('/block/:id',blockUser);
router.put('/activate/:id',activateUser)

router.get('/posts',getAllPosts)
router.delete('/remove/:id',deleteReported)

export default router;