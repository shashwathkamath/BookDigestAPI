import { Router } from 'express';
import { createUser, deleteUser, getUserById, updateUser } from '../controllers/userController';

const router = Router();

// Create new user
router.post('/users/create', createUser);

// Get user by ID 
router.get('/users/:id', getUserById);

// Update user profile
router.put('/users/:id/update', updateUser);

// Delete user
router.delete('/users/:id', deleteUser);

export default router;