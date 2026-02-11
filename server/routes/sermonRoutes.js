import express from 'express';
import {
    getSermons,
    getAdminSermons,
    getSermonById,
    createSermon,
    updateSermon,
    deleteSermon
} from '../controllers/sermonController.js';
import { createRevision } from '../middleware/revisionMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getSermons).post(protect, createSermon);
router.route('/admin').get(protect, getAdminSermons);
router.route('/:id')
    .get(getSermonById)
    .put(createRevision('sermon'), updateSermon)
    .delete(deleteSermon);

export default router;
