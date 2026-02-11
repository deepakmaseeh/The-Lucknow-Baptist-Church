import asyncHandler from 'express-async-handler';
import Sermon from '../models/Sermon.js';

// @desc    Get all sermons
// @route   GET /api/sermons
// @access  Public
const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const getSermons = asyncHandler(async (req, res) => {
    const { tag } = req.query;
    const filter = { isPublished: true };

    if (tag) {
        filter.tags = tag;
    }

    const sermons = await Sermon.find(filter).sort({ createdAt: -1 });
    res.json(sermons);
});

const getAdminSermons = asyncHandler(async (req, res) => {
    const sermons = await Sermon.find({}).sort({ createdAt: -1 });
    res.json(sermons);
});

const getSermonById = asyncHandler(async (req, res) => {
    let sermon;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        sermon = await Sermon.findById(req.params.id);
    }

    if (!sermon) {
        sermon = await Sermon.findOne({ slug: req.params.id });
    }

    if (sermon) {
        res.json(sermon);
    } else {
        res.status(404);
        throw new Error('Sermon not found');
    }
});

const createSermon = asyncHandler(async (req, res) => {
    const { title, series, seriesId, speaker, date, videoUrl, imageUrl, isPublished, tags, publishDate } = req.body;

    // Generate Slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await Sermon.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    const sermon = new Sermon({
        title,
        series,
        seriesId: seriesId || null,
        speaker,
        date,
        videoUrl,
        img: imageUrl,
        isPublished: isPublished !== undefined ? isPublished : true,
        slug,
        tags: tags || [],
        publishDate: publishDate || new Date()
    });

    const createdSermon = await sermon.save();
    res.status(201).json(createdSermon);
});

const updateSermon = asyncHandler(async (req, res) => {
    const { title, series, seriesId, speaker, date, videoUrl, imageUrl, isPublished, tags, publishDate } = req.body;

    const sermon = await Sermon.findById(req.params.id);

    if (sermon) {
        sermon.title = title || sermon.title;
        sermon.series = series || sermon.series;
        if (seriesId !== undefined) sermon.seriesId = seriesId;
        sermon.speaker = speaker || sermon.speaker;
        sermon.date = date || sermon.date;
        sermon.videoUrl = videoUrl || sermon.videoUrl;
        sermon.img = imageUrl || sermon.img;
        if (isPublished !== undefined) sermon.isPublished = isPublished;
        if (tags !== undefined) sermon.tags = tags;
        if (publishDate !== undefined) sermon.publishDate = publishDate;

        const updatedSermon = await sermon.save();
        res.json(updatedSermon);
    } else {
        res.status(404);
        throw new Error('Sermon not found');
    }
});

// @desc    Delete a sermon
// @route   DELETE /api/sermons/:id
// @access  Private/Admin
const deleteSermon = asyncHandler(async (req, res) => {
    const sermon = await Sermon.findById(req.params.id);

    if (sermon) {
        await sermon.deleteOne();
        res.json({ message: 'Sermon removed' });
    } else {
        res.status(404);
        throw new Error('Sermon not found');
    }
});

export { getSermons, getAdminSermons, getSermonById, createSermon, updateSermon, deleteSermon };
