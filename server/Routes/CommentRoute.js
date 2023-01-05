import express from 'express';
import { createComment, deleteComment, getComment } from '../Controllers/CommentController.js';
import authMiddleWare from '../Middleware/authMiddleware.js';
const router=express.Router();
router.use(authMiddleWare)

router.get('/:id',getComment)
router.post('/:id',createComment);
router.delete('/:id',deleteComment);



export default router;
