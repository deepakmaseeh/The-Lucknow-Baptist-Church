import express from 'express';
import FormSubmission from '../models/FormSubmission.js';
import Page from '../models/Page.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Validation helper
function validateFormData(fields, formData) {
    const errors = [];

    fields.forEach(field => {
        const value = formData[field.id];

        // Required field validation
        if (field.required && !value) {
            errors.push({
                field: field.id,
                message: `${field.label} is required`
            });
            return;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push({
                    field: field.id,
                    message: 'Please enter a valid email address'
                });
            }
        }

        // Min/Max length validation
        if (field.validation?.minLength && value && value.length < field.validation.minLength) {
            errors.push({
                field: field.id,
                message: `Minimum ${field.validation.minLength} characters required`
            });
        }
        if (field.validation?.maxLength && value && value.length > field.validation.maxLength) {
            errors.push({
                field: field.id,
                message: `Maximum ${field.validation.maxLength} characters allowed`
            });
        }
    });

    return errors;
}

// Email notification helper (to be implemented with nodemailer)
async function sendEmailNotification(formConfig, formData) {
    // TODO: Implement with nodemailer
    // For now, just log
    console.log('Email notification:', {
        to: formConfig.emailNotification.recipients,
        subject: formConfig.emailNotification.subject,
        data: formData
    });
}

// Submit form (public endpoint)
router.post('/:formId/submit', async (req, res) => {
    try {
        const { formId } = req.params;
        const formData = req.body;

        // Find page with this form
        const page = await Page.findOne({ 'blocks.props.formId': formId });
        if (!page) {
            return res.status(404).json({ error: 'Form not found' });
        }

        // Get form configuration
        const formBlock = page.blocks.find(b => b.props?.formId === formId);
        if (!formBlock) {
            return res.status(404).json({ error: 'Form configuration not found' });
        }

        // Validate required fields
        const errors = validateFormData(formBlock.props.fields, formData);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // Save submission
        const submission = new FormSubmission({
            formId,
            pageId: page._id,
            data: formData,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });
        await submission.save();

        // Send email notification if enabled
        if (formBlock.props.emailNotification?.enabled) {
            await sendEmailNotification(formBlock.props, formData);
        }

        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ error: 'Submission failed. Please try again.' });
    }
});

// Get submissions for a form (admin only)
router.get('/:formId/submissions', requireAuth, async (req, res) => {
    try {
        const { formId } = req.params;
        const { status, limit = 100, skip = 0 } = req.query;

        const query = { formId };
        if (status) {
            query.status = status;
        }

        const submissions = await FormSubmission.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await FormSubmission.countDocuments(query);

        res.json({
            submissions,
            total,
            hasMore: total > parseInt(skip) + submissions.length
        });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});

// Get single submission (admin only)
router.get('/submission/:id', requireAuth, async (req, res) => {
    try {
        const submission = await FormSubmission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        res.json(submission);
    } catch (error) {
        console.error('Error fetching submission:', error);
        res.status(500).json({ error: 'Failed to fetch submission' });
    }
});

// Update submission status (admin only)
router.patch('/submission/:id', requireAuth, async (req, res) => {
    try {
        const { status, notes } = req.body;
        const submission = await FormSubmission.findByIdAndUpdate(
            req.params.id,
            { status, notes },
            { new: true }
        );
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        res.json(submission);
    } catch (error) {
        console.error('Error updating submission:', error);
        res.status(500).json({ error: 'Failed to update submission' });
    }
});

// Delete submission (admin only)
router.delete('/submission/:id', requireAuth, async (req, res) => {
    try {
        const submission = await FormSubmission.findByIdAndDelete(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json({ error: 'Failed to delete submission' });
    }
});

export default router;

