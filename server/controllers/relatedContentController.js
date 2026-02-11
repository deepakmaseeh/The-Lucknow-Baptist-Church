import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';

// @desc    Get related blogs based on tags
// @route   GET /api/blogs/:id/related
// @access  Public
const getRelatedBlogs = asyncHandler(async (req, res) => {
    const currentBlog = await Blog.findById(req.params.id);

    if (!currentBlog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    // Find blogs with at least 1 matching tag
    const relatedBlogs = await Blog.find({
        _id: { $ne: currentBlog._id }, // Exclude current blog
        isPublished: true,
        tags: { $in: currentBlog.tags } // Match any tag
    })
        .limit(4)
        .select('title slug image date author tags')
        .sort({ createdAt: -1 });

    res.json(relatedBlogs);
});

export { getRelatedBlogs };
