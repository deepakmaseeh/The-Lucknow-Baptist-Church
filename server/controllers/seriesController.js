import asyncHandler from 'express-async-handler';
import Series from '../models/Series.js';

// Helper function to generate slug
const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// @desc    Get all series
// @route   GET /api/series
// @access  Public
const getAllSeries = asyncHandler(async (req, res) => {
    const series = await Series.find({}).sort({ createdAt: -1 });
    res.json(series);
});

// @desc    Get series by ID or slug
// @route   GET /api/series/:id
// @access  Public
const getSeriesById = asyncHandler(async (req, res) => {
    let series;

    // Check if valid ObjectId, otherwise search by slug
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        series = await Series.findById(req.params.id);
    }

    if (!series) {
        series = await Series.findOne({ slug: req.params.id });
    }

    if (series) {
        res.json(series);
    } else {
        res.status(404);
        throw new Error('Series not found');
    }
});

// @desc    Create a series
// @route   POST /api/series
// @access  Private/Admin
const createSeries = asyncHandler(async (req, res) => {
    const { title, description, image, startDate, endDate } = req.body;

    // Generate Slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await Series.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    const series = new Series({
        title,
        description,
        image,
        slug,
        startDate,
        endDate
    });

    const createdSeries = await series.save();
    res.status(201).json(createdSeries);
});

// @desc    Update a series
// @route   PUT /api/series/:id
// @access  Private/Admin
const updateSeries = asyncHandler(async (req, res) => {
    const { title, description, image, startDate, endDate } = req.body;

    const series = await Series.findById(req.params.id);

    if (series) {
        series.title = title || series.title;
        series.description = description || series.description;
        series.image = image || series.image;
        series.startDate = startDate || series.startDate;
        series.endDate = endDate || series.endDate;

        const updatedSeries = await series.save();
        res.json(updatedSeries);
    } else {
        res.status(404);
        throw new Error('Series not found');
    }
});

// @desc    Delete a series
// @route   DELETE /api/series/:id
// @access  Private/Admin
const deleteSeries = asyncHandler(async (req, res) => {
    const series = await Series.findById(req.params.id);

    if (series) {
        await series.deleteOne();
        res.json({ message: 'Series removed' });
    } else {
        res.status(404);
        throw new Error('Series not found');
    }
});

export {
    getAllSeries,
    getSeriesById,
    createSeries,
    updateSeries,
    deleteSeries
};
