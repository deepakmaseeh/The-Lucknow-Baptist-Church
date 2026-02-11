import express from 'express';
import {
    getPodcastFeed,
    getPodcastConfig,
    updatePodcastConfig
} from '../controllers/podcastController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public RSS feed
router.get('/feed.xml', getPodcastFeed);

// Admin routes
router.route('/config')
    .get(protect, getPodcastConfig)
    .put(protect, admin, updatePodcastConfig);

export default router;
