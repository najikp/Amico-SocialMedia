import express from 'express';
import { clearNotifications, deleteUser, followUser, getAllUsers, getUser, searchUser, unFollowUser, updateUser } from '../Controllers/UserController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers)
router.get('/search', searchUser);
router.get('/:id', getUser)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)
router.put('/:id/follow', authMiddleware, followUser)
router.put('/:id/unfollow', authMiddleware, unFollowUser)
router.patch('/:id', authMiddleware, clearNotifications)
export default router;