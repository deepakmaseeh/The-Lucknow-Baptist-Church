import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    blocks: [{
        id: String,
        type: String,
        props: mongoose.Schema.Types.Mixed,
        styles: mongoose.Schema.Types.Mixed,
        children: [mongoose.Schema.Types.Mixed]
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    publishedAt: Date
}, {
    timestamps: true
});

const Page = mongoose.model('Page', pageSchema);

export default Page;
