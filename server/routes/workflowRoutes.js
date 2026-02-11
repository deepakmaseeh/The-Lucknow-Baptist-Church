import express from 'express';
import {
    submitForReview,
    approveContent,
    rejectContent,
    publishContent,
    getPendingReview,
    getWorkflowStats
} from '../controllers/workflowController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Workflow actions
router.post('/:contentType/:id/submit', protect, submitForReview);
router.post('/:contentType/:id/approve', protect, approveContent);
router.post('/:contentType/:id/reject', protect, rejectContent);
router.post('/:contentType/:id/publish', protect, publishContent);

// Workflow queries
router.get('/pending', protect, getPendingReview);
router.get('/stats', protect, getWorkflowStats);

export default router;
