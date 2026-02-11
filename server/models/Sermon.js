import mongoose from 'mongoose';

const sermonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    seriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series',
        required: false
    },
    series: {
        type: String,
        required: false  // Keep for backward compatibility
    },
    speaker: {
        type: String,
        required: true
    },
    date: {
        type: String, // Consistent with frontend display format
        required: true
    },
    videoUrl: {
        type: String,
        required: false
    },
    audioUrl: {
        type: String,
        default: ''
    },
    duration: {
        type: Number, // In seconds
        default: 0
    },
    fileSize: {
        type: Number, // In bytes
        default: 0
    },
    episodeNumber: {
        type: Number,
        default: 0
    },
    seasonNumber: {
        type: Number,
        default: 1
    },
    episodeType: {
        type: String,
        enum: ['full', 'trailer', 'bonus'],
        default: 'full'
    },
    imageUrl: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    workflowState: {
        type: String,
        enum: ['draft', 'review', 'approved', 'published', 'archived'],
        default: 'draft'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    submittedAt: Date,
    reviewedAt: Date,
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejectionReason: String,
    workflowHistory: [{
        state: String,
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        changedAt: {
            type: Date,
            default: Date.now
        },
        comment: String
    }]
}, {
    timestamps: true
});

const Sermon = mongoose.model('Sermon', sermonSchema);

export default Sermon;
