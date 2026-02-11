import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';
import Sermon from '../models/Sermon.js';

// @desc    Submit content for review
// @route   POST /api/workflow/:contentType/:id/submit
// @access  Private
const submitForReview = asyncHandler(async (req, res) => {
    const { contentType, id } = req.params;
    const Model = contentType === 'blog' ? Blog : Sermon;

    const content = await Model.findById(id);

    if (!content) {
        res.status(404);
        throw new Error('Content not found');
    }

    if (content.workflowState !== 'draft') {
        res.status(400);
        throw new Error('Only drafts can be submitted for review');
    }

    content.workflowState = 'review';
    content.submittedAt = new Date();
    content.workflowHistory.push({
        state: 'review',
        changedBy: req.user._id,
        comment: req.body.comment || 'Submitted for review'
    });

    await content.save();
    res.json({ message: 'Content submitted for review', content });
});

// @desc    Approve content
// @route   POST /api/workflow/:contentType/:id/approve
// @access  Private (Reviewer/Admin)
const approveContent = asyncHandler(async (req, res) => {
    const { contentType, id } = req.params;
    const Model = contentType === 'blog' ? Blog : Sermon;

    const content = await Model.findById(id);

    if (!content) {
        res.status(404);
        throw new Error('Content not found');
    }

    if (content.workflowState !== 'review') {
        res.status(400);
        throw new Error('Only content in review can be approved');
    }

    content.workflowState = 'approved';
    content.reviewedAt = new Date();
    content.approvedBy = req.user._id;
    content.workflowHistory.push({
        state: 'approved',
        changedBy: req.user._id,
        comment: req.body.comment || 'Approved'
    });

    await content.save();
    res.json({ message: 'Content approved', content });
});

// @desc    Reject content
// @route   POST /api/workflow/:contentType/:id/reject
// @access  Private (Reviewer/Admin)
const rejectContent = asyncHandler(async (req, res) => {
    const { contentType, id } = req.params;
    const { reason } = req.body;
    const Model = contentType === 'blog' ? Blog : Sermon;

    const content = await Model.findById(id);

    if (!content) {
        res.status(404);
        throw new Error('Content not found');
    }

    if (content.workflowState !== 'review') {
        res.status(400);
        throw new Error('Only content in review can be rejected');
    }

    content.workflowState = 'draft';
    content.rejectionReason = reason || 'No reason provided';
    content.workflowHistory.push({
        state: 'draft',
        changedBy: req.user._id,
        comment: `Rejected: ${reason || 'No reason provided'}`
    });

    await content.save();
    res.json({ message: 'Content rejected', content });
});

// @desc    Publish approved content
// @route   POST /api/workflow/:contentType/:id/publish
// @access  Private (Editor/Admin)
const publishContent = asyncHandler(async (req, res) => {
    const { contentType, id } = req.params;
    const Model = contentType === 'blog' ? Blog : Sermon;

    const content = await Model.findById(id);

    if (!content) {
        res.status(404);
        throw new Error('Content not found');
    }

    // Allow publishing from approved or draft (for admins)
    if (content.workflowState !== 'approved' && content.workflowState !== 'draft') {
        res.status(400);
        throw new Error('Only approved content can be published');
    }

    content.workflowState = 'published';
    content.isPublished = true;
    content.workflowHistory.push({
        state: 'published',
        changedBy: req.user._id,
        comment: req.body.comment || 'Published'
    });

    await content.save();
    res.json({ message: 'Content published', content });
});

// @desc    Get pending review items
// @route   GET /api/workflow/pending
// @access  Private (Reviewer/Admin)
const getPendingReview = asyncHandler(async (req, res) => {
    const [blogs, sermons] = await Promise.all([
        Blog.find({ workflowState: 'review' })
            .populate('assignedTo', 'username email')
            .sort({ submittedAt: -1 }),
        Sermon.find({ workflowState: 'review' })
            .populate('assignedTo', 'username email')
            .sort({ submittedAt: -1 })
    ]);

    res.json({ blogs, sermons, total: blogs.length + sermons.length });
});

// @desc    Get workflow statistics
// @route   GET /api/workflow/stats
// @access  Private
const getWorkflowStats = asyncHandler(async (req, res) => {
    const [blogStats, sermonStats] = await Promise.all([
        Blog.aggregate([
            { $group: { _id: '$workflowState', count: { $sum: 1 } } }
        ]),
        Sermon.aggregate([
            { $group: { _id: '$workflowState', count: { $sum: 1 } } }
        ])
    ]);

    const formatStats = (stats) => {
        const result = { draft: 0, review: 0, approved: 0, published: 0, archived: 0 };
        stats.forEach(s => {
            if (s._id) result[s._id] = s.count;
        });
        return result;
    };

    res.json({
        blogs: formatStats(blogStats),
        sermons: formatStats(sermonStats)
    });
});

export {
    submitForReview,
    approveContent,
    rejectContent,
    publishContent,
    getPendingReview,
    getWorkflowStats
};
