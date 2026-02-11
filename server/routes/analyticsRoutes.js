import express from 'express';
import {
    trackEvent,
    getContentAnalytics,
    getDashboardStats
} from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public tracking endpoint
router.post('/track', trackEvent);

// Protected analytics endpoints
router.get('/dashboard', protect, getDashboardStats);
router.get('/:contentType/:contentId', protect, getContentAnalytics);

export default router;
