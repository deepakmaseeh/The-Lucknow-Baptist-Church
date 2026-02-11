import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
}, { timestamps: true });

const Series = mongoose.model('Series', seriesSchema);

export default Series;
