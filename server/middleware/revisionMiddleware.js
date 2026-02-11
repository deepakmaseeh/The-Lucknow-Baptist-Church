import Revision from '../models/Revision.js';

// Middleware to create revision before update
const createRevision = (contentType) => {
    return async (req, res, next) => {
        try {
            // Only create revision on updates, not creates
            if (req.method !== 'PUT' && req.method !== 'PATCH') {
                return next();
            }

            const contentId = req.params.id;

            // Get the current content before update
            const Model = contentType === 'blog'
                ? (await import('../models/Blog.js')).default
                : (await import('../models/Sermon.js')).default;

            const currentContent = await Model.findById(contentId);

            if (!currentContent) {
                return next();
            }

            // Get next version number
            const latestVersion = await Revision.getLatestVersion(contentType, contentId);
            const nextVersion = latestVersion + 1;

            // Detect changed fields
            const fieldsChanged = detectChanges(currentContent.toObject(), req.body);

            // Create revision snapshot
            const revision = new Revision({
                contentType,
                contentId,
                version: nextVersion,
                data: currentContent.toObject(),
                changedBy: req.user?._id || null,
                changeType: 'updated',
                changesSummary: generateChangesSummary(fieldsChanged),
                fieldsChanged
            });

            await revision.save();

            // Attach revision info to request for logging
            req.revisionCreated = {
                version: nextVersion,
                revisionId: revision._id
            };

            next();
        } catch (error) {
            console.error('Error creating revision:', error);
            // Don't block the update if revision fails
            next();
        }
    };
};

// Detect which fields changed
function detectChanges(oldData, newData) {
    const changes = [];
    const fieldsToTrack = ['title', 'content', 'author', 'speaker', 'series', 'tags', 'isPublished'];

    for (const field of fieldsToTrack) {
        if (newData[field] !== undefined && JSON.stringify(oldData[field]) !== JSON.stringify(newData[field])) {
            changes.push({
                field,
                oldValue: truncateValue(oldData[field]),
                newValue: truncateValue(newData[field])
            });
        }
    }

    return changes;
}

// Truncate long values for summary
function truncateValue(value) {
    if (typeof value === 'string' && value.length > 100) {
        return value.substring(0, 100) + '...';
    }
    return JSON.stringify(value);
}

// Generate human-readable summary
function generateChangesSummary(fieldsChanged) {
    if (fieldsChanged.length === 0) return 'No significant changes';

    const fieldNames = fieldsChanged.map(f => f.field).join(', ');
    return `Updated: ${fieldNames}`;
}

export { createRevision };
