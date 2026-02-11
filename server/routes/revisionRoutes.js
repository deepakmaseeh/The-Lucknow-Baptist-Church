import express from 'express';
import {
    getRevisions,
    getRevisionById,
    compareRevisions,
    restoreRevision,
    cleanupRevisions
} from '../controllers/revisionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all revisions for content
router.get('/:contentType/:contentId', protect, getRevisions);

// Get specific revision
router.get('/:id', protect, getRevisionById);

// Compare two revisions
router.get('/:id/compare/:otherId', protect, compareRevisions);

// Restore to revision
router.post('/:id/restore', protect, restoreRevision);

// Cleanup old revisions (admin only)
router.delete('/cleanup/:contentType/:contentId', protect, admin, cleanupRevisions);

export default router;
