import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
        index: true
    },
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    ipAddress: String,
    userAgent: String,
    status: {
        type: String,
        enum: ['new', 'read', 'archived'],
        default: 'new'
    },
    notes: String
}, {
    timestamps: true
});

// Index for faster queries
formSubmissionSchema.index({ formId: 1, createdAt: -1 });
formSubmissionSchema.index({ status: 1 });

export default mongoose.model('FormSubmission', formSubmissionSchema);
