import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false,
        default: 'General'
    },
    date: {
        type: String, // Storing as string for display flexibility, or use Date type
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    readTime: {
        type: Number, // In minutes
        default: 0
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

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
