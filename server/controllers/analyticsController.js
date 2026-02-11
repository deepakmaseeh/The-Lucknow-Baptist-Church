import asyncHandler from 'express-async-handler';
import Analytics from '../models/Analytics.js';
import Blog from '../models/Blog.js';
import Sermon from '../models/Sermon.js';

// @desc    Track a view event
// @route   POST /api/analytics/track
// @access  Public
const trackEvent = asyncHandler(async (req, res) => {
    const { contentType, contentId, event = 'view' } = req.body;

    // Detect device type
    const userAgent = req.headers['user-agent'] || '';
    let device = 'desktop';
    if (/mobile/i.test(userAgent)) device = 'mobile';
    else if (/tablet|ipad/i.test(userAgent)) device = 'tablet';

    const analytics = new Analytics({
        contentType,
        contentId,
        event,
        sessionId: req.sessionID || 'anonymous',
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent,
        referrer: req.headers.referer || req.headers.referrer || '',
        device
    });

    await analytics.save();
    res.json({ success: true });
});

// @desc    Get analytics for specific content
// @route   GET /api/analytics/:contentType/:contentId
// @access  Private
const getContentAnalytics = asyncHandler(async (req, res) => {
    const { contentType, contentId } = req.params;

    const totalViews = await Analytics.countDocuments({
        contentType,
        contentId,
        event: 'view'
    });

    const uniqueViews = await Analytics.distinct('sessionId', {
        contentType,
        contentId,
        event: 'view'
    });

    const deviceBreakdown = await Analytics.aggregate([
        { $match: { contentType, contentId, event: 'view' } },
        { $group: { _id: '$device', count: { $sum: 1 } } }
    ]);

    const topReferrers = await Analytics.aggregate([
        { $match: { contentType, contentId, event: 'view', referrer: { $ne: '' } } },
        { $group: { _id: '$referrer', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ]);

    const viewsOverTime = await Analytics.aggregate([
        { $match: { contentType, contentId, event: 'view' } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: -1 } },
        { $limit: 30 }
    ]);

    res.json({
        totalViews,
        uniqueViews: uniqueViews.length,
        deviceBreakdown,
        topReferrers,
        viewsOverTime
    });
});

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Total views in last 30 days
    const totalViews = await Analytics.countDocuments({
        event: 'view',
        createdAt: { $gte: thirtyDaysAgo }
    });

    // Top blogs
    const topBlogs = await Analytics.aggregate([
        { $match: { contentType: 'blog', event: 'view', createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: '$contentId', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 5 }
    ]);

    // Populate blog details
    const topBlogsWithDetails = await Promise.all(
        topBlogs.map(async (item) => {
            const blog = await Blog.findById(item._id).select('title slug');
            return { ...item, blog };
        })
    );

    // Top sermons
    const topSermons = await Analytics.aggregate([
        { $match: { contentType: 'sermon', event: 'view', createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: '$contentId', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 5 }
    ]);

    const topSermonsWithDetails = await Promise.all(
        topSermons.map(async (item) => {
            const sermon = await Sermon.findById(item._id).select('title speaker');
            return { ...item, sermon };
        })
    );

    // Device breakdown
    const deviceStats = await Analytics.aggregate([
        { $match: { event: 'view', createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: '$device', count: { $sum: 1 } } }
    ]);

    // Views per day
    const viewsPerDay = await Analytics.aggregate([
        { $match: { event: 'view', createdAt: { $gte: thirtyDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    res.json({
        totalViews,
        topBlogs: topBlogsWithDetails,
        topSermons: topSermonsWithDetails,
        deviceStats,
        viewsPerDay
    });
});

export {
    trackEvent,
    getContentAnalytics,
    getDashboardStats
};
