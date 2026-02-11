import mongoose from 'mongoose';

const siteConfigSchema = mongoose.Schema({
    // Identity
    siteName: { type: String, default: 'The Lucknow Baptist Church' },
    tagline: { type: String, default: 'Welcome Home' },

    // Assets
    logoUrl: { type: String, default: '' }, // Empty string means use default text or hardcoded fallback initially
    faviconUrl: { type: String, default: '' },

    // Design System (The "Theme")
    theme: {
        primaryColor: { type: String, default: '#D4AF37' }, // Gold
        secondaryColor: { type: String, default: '#111111' }, // Dark
        backgroundColor: { type: String, default: '#f4f1ea' }, // Beige
        fontHeading: { type: String, default: 'Playfair Display' },
        fontBody: { type: String, default: 'Roboto' }
    },

    // Contact Info (Global Footer data)
    contact: {
        address: { type: String, default: '123 Church Street, Lucknow' },
        phone: { type: String, default: '+91 98765 43210' },
        email: { type: String, default: 'info@lucknowbaptist.org' },
        socialLinks: {
            facebook: { type: String, default: '#' },
            youtube: { type: String, default: '#' },
            instagram: { type: String, default: '#' }
        }
    }
}, {
    timestamps: true
});

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

export default SiteConfig;
