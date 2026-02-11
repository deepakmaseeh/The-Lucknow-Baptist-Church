import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    contentType: {
        type: String,
        required: true,
        enum: ['blog', 'sermon']
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'contentType'
    },
    event: {
        type: String,
        enum: ['view', 'share', 'download'],
        default: 'view'
    },
    sessionId: String,
    ipAddress: String,
    userAgent: String,
    referrer: String,
    device: {
        type: String,
        enum: ['mobile', 'tablet', 'desktop'],
        default: 'desktop'
    }
}, {
    timestamps: true
});

// Index for efficient queries
analyticsSchema.index({ contentType: 1, contentId: 1 });
analyticsSchema.index({ createdAt: -1 });
analyticsSchema.index({ event: 1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
