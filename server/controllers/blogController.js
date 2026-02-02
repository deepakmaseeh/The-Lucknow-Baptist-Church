import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }); // Newest first
    res.json(blogs);
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin (Will add auth middleware later)
const createBlog = asyncHandler(async (req, res) => {
    const { title, author, image, content, category, date } = req.body;

    const blog = new Blog({
        title,
        author,
        image,
        content,
        category,
        date
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

export { getBlogs, getBlogById, createBlog, deleteBlog };
