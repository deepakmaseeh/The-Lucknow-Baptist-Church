import express from 'express';
import { getBlogs, getBlogById, createBlog, deleteBlog } from '../controllers/blogController.js';
// import { protect } from '../middleware/authMiddleware.js'; // Will implement later

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(createBlog);

router.route('/:id')
    .get(getBlogById)
    .delete(deleteBlog);

export default router;
