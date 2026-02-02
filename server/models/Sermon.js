import mongoose from 'mongoose';

const sermonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
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
    }
}, {
    timestamps: true
});

const Sermon = mongoose.model('Sermon', sermonSchema);

export default Sermon;
