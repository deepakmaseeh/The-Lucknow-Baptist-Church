import mongoose from 'mongoose';

const podcastConfigSchema = new mongoose.Schema({
    // Basic Info
    title: {
        type: String,
        required: true,
        default: 'Church Sermons Podcast'
    },
    description: {
        type: String,
        required: true,
        default: 'Weekly sermons and teachings'
    },
    author: {
        type: String,
        required: true,
        default: 'Church Name'
    },
    email: {
        type: String,
        required: true
    },

    // iTunes Specific
    category: {
        type: String,
        default: 'Religion & Spirituality'
    },
    subcategory: {
        type: String,
        default: 'Christianity'
    },
    language: {
        type: String,
        default: 'en-us'
    },
    copyright: {
        type: String,
        default: '© 2024 All rights reserved'
    },

    // Images
    imageUrl: {
        type: String,
        required: true
    },

    // Settings
    explicit: {
        type: Boolean,
        default: false
    },

    // Links
    websiteUrl: {
        type: String,
        default: ''
    },
    itunesUrl: {
        type: String,
        default: ''
    },
    spotifyUrl: {
        type: String,
        default: ''
    },

    // Additional iTunes fields
    ownerName: {
        type: String,
        default: ''
    },
    ownerEmail: {
        type: String,
        default: ''
    },

    // Active status
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const PodcastConfig = mongoose.model('PodcastConfig', podcastConfigSchema);

export default PodcastConfig;
