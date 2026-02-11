import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema({
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
    version: {
        type: Number,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    changeType: {
        type: String,
        enum: ['created', 'updated', 'restored', 'published', 'unpublished'],
        default: 'updated'
    },
    changesSummary: {
        type: String,
        default: ''
    },
    fieldsChanged: [{
        field: String,
        oldValue: String,
        newValue: String
    }]
}, {
    timestamps: true
});

// Index for efficient queries
revisionSchema.index({ contentType: 1, contentId: 1, version: -1 });
revisionSchema.index({ createdAt: -1 });

// Static method to get latest version number
revisionSchema.statics.getLatestVersion = async function (contentType, contentId) {
    const latest = await this.findOne({ contentType, contentId })
        .sort({ version: -1 })
        .select('version');
    return latest ? latest.version : 0;
};

const Revision = mongoose.model('Revision', revisionSchema);

export default Revision;
