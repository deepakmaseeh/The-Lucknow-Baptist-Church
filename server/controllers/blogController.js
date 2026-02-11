import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const getBlogs = asyncHandler(async (req, res) => {
    const { tag } = req.query;
    const filter = { isPublished: true };

    if (tag) {
        filter.tags = tag;
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
});

const getAdminBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
    let blog;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        blog = await Blog.findById(req.params.id);
    }

    if (!blog) {
        blog = await Blog.findOne({ slug: req.params.id });
    }

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

const createBlog = asyncHandler(async (req, res) => {
    const { title, author, image, content, category, date, isPublished, tags, publishDate } = req.body;

    // Generate Slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await Blog.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    // Calculate Read Time
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const blog = new Blog({
        title,
        author,
        image,
        content,
        category,
        date: date || new Date().toISOString().split('T')[0], // Default date if not provided
        isPublished: isPublished !== undefined ? isPublished : true,
        slug,
        readTime,
        tags: tags || [],
        publishDate: publishDate || new Date()
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

const updateBlog = asyncHandler(async (req, res) => {
    const { title, author, image, content, category, date, isPublished, tags, publishDate } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title || blog.title;
        blog.author = author || blog.author;
        blog.image = image || blog.image;
        blog.content = content || blog.content;
        blog.category = category || blog.category;
        blog.date = date || blog.date;
        if (isPublished !== undefined) blog.isPublished = isPublished;
        if (tags !== undefined) blog.tags = tags;
        if (publishDate !== undefined) blog.publishDate = publishDate;

        // Recalculate read time if content changed
        if (content) {
            const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
            blog.readTime = Math.ceil(wordCount / 200);
        }

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
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

export { getBlogs, getAdminBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
