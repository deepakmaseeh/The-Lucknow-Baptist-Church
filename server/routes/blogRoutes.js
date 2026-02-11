import express from 'express';
import {
    getBlogs,
    getAdminBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';
import { getRelatedBlogs } from '../controllers/relatedContentController.js';
import { createRevision } from '../middleware/revisionMiddleware.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(cacheMiddleware(300), getBlogs) // Cache for 5 minutes
    .post(protect, createBlog);

router.route('/admin').get(protect, getAdminBlogs);

router.route('/:id')
    .get(cacheMiddleware(3600), getBlogById) // Cache for 1 hour
    .put(createRevision('blog'), updateBlog)
    .delete(deleteBlog);

router.route('/:id/related').get(getRelatedBlogs);

export default router;
