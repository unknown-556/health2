import express from 'express';
import { getUserProfile } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';


const router = express.Router();

// Route to get user profile with token authentication
router.get('/profile', auth, getUserProfile);

export default router;
