import express from 'express';
import asyncHandler from 'express-async-handler';
import Page from '../models/Page.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all pages
// @route   GET /api/pages
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const pages = await Page.find().sort('-createdAt');
    res.json(pages);
}));

// @desc    Get single page by ID
// @route   GET /api/pages/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (page) {
        res.json(page);
    } else {
        res.status(404);
        throw new Error('Page not found');
    }
}));

// @desc    Get page by slug
// @route   GET /api/pages/slug/:slug
// @access  Public
router.get('/slug/:slug', asyncHandler(async (req, res) => {
    const page = await Page.findOne({ slug: req.params.slug });

    if (page) {
        res.json(page);
    } else {
        res.status(404);
        throw new Error('Page not found');
    }
}));

// @desc    Create new page
// @route   POST /api/pages
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
    const { title, slug, blocks, status, featuredImage, metaDescription } = req.body;

    const page = await Page.create({
        title,
        slug,
        blocks: blocks || [],
        status: status || 'draft',
        featuredImage: featuredImage || '',
        metaDescription: metaDescription || '',
        createdBy: req.user._id
    });

    res.status(201).json(page);
}));

// @desc    Update page
// @route   PUT /api/pages/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (page) {
        page.title = req.body.title || page.title;
        page.slug = req.body.slug || page.slug;
        page.blocks = req.body.blocks || page.blocks;
        page.status = req.body.status || page.status;
        if (req.body.featuredImage !== undefined) page.featuredImage = req.body.featuredImage;
        if (req.body.metaDescription !== undefined) page.metaDescription = req.body.metaDescription;

        if (req.body.status === 'published' && !page.publishedAt) {
            page.publishedAt = new Date();
        }

        const updatedPage = await page.save();
        res.json(updatedPage);
    } else {
        res.status(404);
        throw new Error('Page not found');
    }
}));

// @desc    Delete page
// @route   DELETE /api/pages/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (page) {
        await page.deleteOne();
        res.json({ message: 'Page removed' });
    } else {
        res.status(404);
        throw new Error('Page not found');
    }
}));

export default router;
