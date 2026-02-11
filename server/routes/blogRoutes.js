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
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, createBlog);

router.route('/admin').get(protect, getAdminBlogs);

router.route('/:id')
    .get(getBlogById)
    .put(updateBlog)
    .delete(deleteBlog);

router.route('/:id/related').get(getRelatedBlogs);

export default router;
