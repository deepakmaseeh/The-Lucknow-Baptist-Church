import asyncHandler from 'express-async-handler';
import Sermon from '../models/Sermon.js';

// @desc    Get all sermons
// @route   GET /api/sermons
// @access  Public
const getSermons = asyncHandler(async (req, res) => {
    const sermons = await Sermon.find({}).sort({ createdAt: -1 }); // Newest first
    res.json(sermons);
});

// @desc    Create a sermon
// @route   POST /api/sermons
// @access  Private/Admin
const createSermon = asyncHandler(async (req, res) => {
    const { title, series, speaker, date, videoUrl, imageUrl } = req.body;

    const sermon = new Sermon({
        title,
        series,
        speaker,
        date,
        videoUrl,
        img: imageUrl // Mapping frontend 'imageUrl' to DB 'img'
    });

    const createdSermon = await sermon.save();
    res.status(201).json(createdSermon);
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

export { getSermons, createSermon, deleteSermon };
