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
    }
}, {
    timestamps: true
});

const Sermon = mongoose.model('Sermon', sermonSchema);

export default Sermon;
