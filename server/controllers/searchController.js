import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';
import Sermon from '../models/Sermon.js';

// @desc    Search blogs and sermons
// @route   GET /api/search?q=query
// @access  Public
const searchContent = asyncHandler(async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === '') {
        return res.json({ blogs: [], sermons: [] });
    }

    const searchRegex = new RegExp(q, 'i'); // Case-insensitive search

    // Search blogs
    const blogs = await Blog.find({
        isPublished: true,
        $or: [
            { title: searchRegex },
            { content: searchRegex },
            { author: searchRegex },
            { tags: searchRegex }
        ]
    })
        .select('title slug image date author tags readTime')
        .limit(10)
        .sort({ createdAt: -1 });

    // Search sermons
    const sermons = await Sermon.find({
        isPublished: true,
        $or: [
            { title: searchRegex },
            { speaker: searchRegex },
            { series: searchRegex },
            { tags: searchRegex }
        ]
    })
        .select('title slug img date speaker series tags')
        .limit(10)
        .sort({ createdAt: -1 });

    res.json({ blogs, sermons });
});

export { searchContent };
