import asyncHandler from 'express-async-handler';
import Revision from '../models/Revision.js';
import Blog from '../models/Blog.js';
import Sermon from '../models/Sermon.js';

// @desc    Get all revisions for a piece of content
// @route   GET /api/revisions/:contentType/:contentId
// @access  Private
const getRevisions = asyncHandler(async (req, res) => {
    const { contentType, contentId } = req.params;

    const revisions = await Revision.find({ contentType, contentId })
        .sort({ version: -1 })
        .populate('changedBy', 'username email')
        .select('-data'); // Exclude full data for list view

    res.json(revisions);
});

// @desc    Get a specific revision with full data
// @route   GET /api/revisions/:id
// @access  Private
const getRevisionById = asyncHandler(async (req, res) => {
    const revision = await Revision.findById(req.params.id)
        .populate('changedBy', 'username email');

    if (!revision) {
        res.status(404);
        throw new Error('Revision not found');
    }

    res.json(revision);
});

// @desc    Compare two revisions
// @route   GET /api/revisions/:id/compare/:otherId
// @access  Private
const compareRevisions = asyncHandler(async (req, res) => {
    const { id, otherId } = req.params;

    const [revision1, revision2] = await Promise.all([
        Revision.findById(id),
        Revision.findById(otherId)
    ]);

    if (!revision1 || !revision2) {
        res.status(404);
        throw new Error('One or both revisions not found');
    }

    // Simple field-by-field comparison
    const comparison = {
        revision1: {
            version: revision1.version,
            createdAt: revision1.createdAt,
            changedBy: revision1.changedBy
        },
        revision2: {
            version: revision2.version,
            createdAt: revision2.createdAt,
            changedBy: revision2.changedBy
        },
        differences: []
    };

    // Compare key fields
    const fieldsToCompare = ['title', 'content', 'author', 'speaker', 'tags', 'isPublished'];

    for (const field of fieldsToCompare) {
        const val1 = revision1.data[field];
        const val2 = revision2.data[field];

        if (JSON.stringify(val1) !== JSON.stringify(val2)) {
            comparison.differences.push({
                field,
                value1: val1,
                value2: val2
            });
        }
    }

    res.json(comparison);
});

// @desc    Restore content to a specific revision
// @route   POST /api/revisions/:id/restore
// @access  Private
const restoreRevision = asyncHandler(async (req, res) => {
    const revision = await Revision.findById(req.params.id);

    if (!revision) {
        res.status(404);
        throw new Error('Revision not found');
    }

    // Get the model based on content type
    const Model = revision.contentType === 'blog' ? Blog : Sermon;

    // Find current content
    const content = await Model.findById(revision.contentId);

    if (!content) {
        res.status(404);
        throw new Error('Original content not found');
    }

    // Create a new revision of current state before restoring
    const currentVersion = await Revision.getLatestVersion(revision.contentType, revision.contentId);

    const backupRevision = new Revision({
        contentType: revision.contentType,
        contentId: revision.contentId,
        version: currentVersion + 1,
        data: content.toObject(),
        changedBy: req.user._id,
        changeType: 'updated',
        changesSummary: `Before restoring to version ${revision.version}`
    });
    await backupRevision.save();

    // Restore the content from revision data
    Object.assign(content, revision.data);
    await content.save();

    // Create restoration revision
    const restorationRevision = new Revision({
        contentType: revision.contentType,
        contentId: revision.contentId,
        version: currentVersion + 2,
        data: content.toObject(),
        changedBy: req.user._id,
        changeType: 'restored',
        changesSummary: `Restored to version ${revision.version}`
    });
    await restorationRevision.save();

    res.json({
        message: `Content restored to version ${revision.version}`,
        content,
        newVersion: currentVersion + 2
    });
});

// @desc    Delete old revisions (cleanup)
// @route   DELETE /api/revisions/cleanup/:contentType/:contentId
// @access  Private/Admin
const cleanupRevisions = asyncHandler(async (req, res) => {
    const { contentType, contentId } = req.params;
    const keepCount = parseInt(req.query.keep) || 50; // Keep last 50 by default

    const totalRevisions = await Revision.countDocuments({ contentType, contentId });

    if (totalRevisions <= keepCount) {
        return res.json({ message: 'No cleanup needed', totalRevisions });
    }

    // Get revisions to delete (oldest ones)
    const revisionsToDelete = await Revision.find({ contentType, contentId })
        .sort({ version: -1 })
        .skip(keepCount)
        .select('_id');

    const idsToDelete = revisionsToDelete.map(r => r._id);
    const result = await Revision.deleteMany({ _id: { $in: idsToDelete } });

    res.json({
        message: `Cleaned up ${result.deletedCount} old revisions`,
        kept: keepCount,
        deleted: result.deletedCount
    });
});

export {
    getRevisions,
    getRevisionById,
    compareRevisions,
    restoreRevision,
    cleanupRevisions
};
