import express from 'express';
const router=express.Router();
import {createPost, deletePost, getPost, getTimelinePosts, likePost, reportPost, updatePost } from '../Controllers/PostController.js';
import authMiddleWare from '../Middleware/authMiddleware.js';
router.use(authMiddleWare);

router.post('/',createPost);
router.get('/:id',getPost);
router.put('/:id',updatePost);
router.put('/:id/report',reportPost);
router.delete('/:id',deletePost);
router.put('/:id/like',likePost);
router.get('/:id/timeline',getTimelinePosts);
export default router;