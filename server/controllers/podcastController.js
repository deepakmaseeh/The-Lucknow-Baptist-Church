import asyncHandler from 'express-async-handler';
import RSS from 'rss';
import PodcastConfig from '../models/PodcastConfig.js';
import Sermon from '../models/Sermon.js';

// @desc    Generate podcast RSS feed
// @route   GET /api/podcast/feed.xml
// @access  Public
const getPodcastFeed = asyncHandler(async (req, res) => {
    // Get podcast configuration
    let config = await PodcastConfig.findOne({ isActive: true });

    // Create default config if none exists
    if (!config) {
        config = {
            title: 'Church Sermons Podcast',
            description: 'Weekly sermons and teachings',
            author: 'Church',
            email: 'podcast@church.com',
            category: 'Religion & Spirituality',
            subcategory: 'Christianity',
            language: 'en-us',
            copyright: '© 2024 All rights reserved',
            imageUrl: 'https://example.com/podcast-image.jpg',
            explicit: false,
            websiteUrl: req.protocol + '://' + req.get('host')
        };
    }

    // Get published sermons with audio
    const sermons = await Sermon.find({
        isPublished: true,
        audioUrl: { $exists: true, $ne: '' }
    })
        .sort({ date: -1 })
        .limit(100); // Limit to last 100 episodes

    // Create RSS feed
    const feed = new RSS({
        title: config.title,
        description: config.description,
        feed_url: `${req.protocol}://${req.get('host')}/api/podcast/feed.xml`,
        site_url: config.websiteUrl || `${req.protocol}://${req.get('host')}`,
        image_url: config.imageUrl,
        language: config.language,
        copyright: config.copyright,
        pubDate: sermons.length > 0 ? new Date(sermons[0].date) : new Date(),
        ttl: 60, // Cache for 60 minutes

        // iTunes-specific tags
        custom_namespaces: {
            'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
            'content': 'http://purl.org/rss/1.0/modules/content/'
        },
        custom_elements: [
            { 'itunes:author': config.author },
            { 'itunes:summary': config.description },
            {
                'itunes:owner': [
                    { 'itunes:name': config.ownerName || config.author },
                    { 'itunes:email': config.ownerEmail || config.email }
                ]
            },
            { 'itunes:explicit': config.explicit ? 'yes' : 'no' },
            {
                'itunes:category': [
                    { _attr: { text: config.category } },
                    { 'itunes:category': { _attr: { text: config.subcategory } } }
                ]
            },
            { 'itunes:image': { _attr: { href: config.imageUrl } } }
        ]
    });

    // Add episodes
    sermons.forEach(sermon => {
        const item = {
            title: sermon.title,
            description: sermon.series || 'Sermon',
            url: `${req.protocol}://${req.get('host')}/sermons`, // Link to sermons page
            guid: sermon._id.toString(),
            date: new Date(sermon.date),
            enclosure: {
                url: sermon.audioUrl,
                type: 'audio/mpeg',
                size: sermon.fileSize || 0
            },
            custom_elements: [
                { 'itunes:author': sermon.speaker },
                { 'itunes:subtitle': sermon.series || '' },
                { 'itunes:summary': `${sermon.title} - ${sermon.speaker}` },
                { 'itunes:duration': formatDuration(sermon.duration) },
                { 'itunes:explicit': 'no' }
            ]
        };

        // Add episode number if available
        if (sermon.episodeNumber) {
            item.custom_elements.push({ 'itunes:episode': sermon.episodeNumber });
        }

        // Add season number if available
        if (sermon.seasonNumber) {
            item.custom_elements.push({ 'itunes:season': sermon.seasonNumber });
        }

        // Add episode type
        if (sermon.episodeType) {
            item.custom_elements.push({ 'itunes:episodeType': sermon.episodeType });
        }

        // Add image if available
        if (sermon.imageUrl) {
            item.custom_elements.push({
                'itunes:image': { _attr: { href: sermon.imageUrl } }
            });
        }

        feed.item(item);
    });

    // Set content type and send XML
    res.set('Content-Type', 'application/rss+xml; charset=UTF-8');
    res.send(feed.xml({ indent: true }));
});

// @desc    Get podcast configuration
// @route   GET /api/podcast/config
// @access  Private
const getPodcastConfig = asyncHandler(async (req, res) => {
    let config = await PodcastConfig.findOne({ isActive: true });

    if (!config) {
        // Create default config
        config = new PodcastConfig({
            title: 'Church Sermons Podcast',
            description: 'Weekly sermons and teachings',
            author: 'Church',
            email: 'podcast@church.com',
            imageUrl: 'https://example.com/podcast-image.jpg'
        });
        await config.save();
    }

    res.json(config);
});

// @desc    Update podcast configuration
// @route   PUT /api/podcast/config
// @access  Private/Admin
const updatePodcastConfig = asyncHandler(async (req, res) => {
    let config = await PodcastConfig.findOne({ isActive: true });

    if (!config) {
        config = new PodcastConfig(req.body);
    } else {
        Object.assign(config, req.body);
    }

    const updatedConfig = await config.save();
    res.json(updatedConfig);
});

// Helper function to format duration for iTunes
function formatDuration(seconds) {
    if (!seconds) return '00:00:00';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export {
    getPodcastFeed,
    getPodcastConfig,
    updatePodcastConfig
};
