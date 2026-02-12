import mongoose from 'mongoose';

const siteConfigSchema = mongoose.Schema({
    // Identity
    siteName: { type: String, default: 'The Lucknow Baptist Church' },
    tagline: { type: String, default: 'Welcome Home' },

    // Assets
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },

    // Design System (The "Theme")
    theme: {
        // Core Colors
        primaryColor: { type: String, default: '#D4AF37' }, // Gold
        secondaryColor: { type: String, default: '#111111' }, // Dark
        backgroundColor: { type: String, default: '#f4f1ea' }, // Beige

        // Extended Color Palette
        accentColor: { type: String, default: '#C9A532' }, // Darker gold for accents
        textColor: { type: String, default: '#333333' }, // Primary text
        linkColor: { type: String, default: '#D4AF37' }, // Links
        linkHoverColor: { type: String, default: '#C9A532' }, // Link hover
        successColor: { type: String, default: '#28a745' }, // Success messages
        errorColor: { type: String, default: '#dc3545' }, // Error messages
        warningColor: { type: String, default: '#ffc107' }, // Warnings
        borderColor: { type: String, default: '#e0e0e0' }, // Borders
        cardBackground: { type: String, default: '#ffffff' }, // Card backgrounds
        headerBackground: { type: String, default: '#ffffff' }, // Header background
        footerBackground: { type: String, default: '#1a1a1a' }, // Footer background
        footerTextColor: { type: String, default: '#ffffff' }, // Footer text

        // Typography
        fontHeading: { type: String, default: 'Playfair Display' },
        fontBody: { type: String, default: 'Roboto' },
        baseFontSize: { type: String, default: '16px' },
        lineHeight: { type: String, default: '1.6' },
        letterSpacing: { type: String, default: 'normal' },
        headingWeight: { type: String, default: '700' },
        bodyWeight: { type: String, default: '400' },

        // Spacing & Layout
        containerMaxWidth: { type: String, default: '1200px' },
        sectionPadding: { type: String, default: '80px' },
        elementSpacing: { type: String, default: '20px' },
        borderRadius: { type: String, default: '8px' },
        cardShadow: { type: String, default: '0 2px 8px rgba(0,0,0,0.1)' },

        // Header
        headerStyle: { type: String, default: 'solid' }, // solid, transparent, sticky
        headerHeight: { type: String, default: '80px' },
        logoPosition: { type: String, default: 'left' }, // left, center, right
        logoSize: { type: String, default: '120px' },

        // Footer
        footerLayout: { type: String, default: '3-column' }, // 1-column, 2-column, 3-column, 4-column
        footerPadding: { type: String, default: '60px' },

        // Buttons
        buttonBorderRadius: { type: String, default: '6px' },
        buttonPadding: { type: String, default: '12px 24px' },
        buttonFontSize: { type: String, default: '16px' },
        buttonFontWeight: { type: String, default: '600' },
        buttonHoverEffect: { type: String, default: 'lift' }, // lift, scale, glow, none

        // Advanced
        customCSS: { type: String, default: '' },
        darkModeEnabled: { type: Boolean, default: false },
        animationsEnabled: { type: Boolean, default: true },
        scrollBehavior: { type: String, default: 'smooth' } // smooth, instant
    },

    // Contact Info & Social Media
    contact: {
        address: { type: String, default: '123 Church Street, Lucknow' },
        phone: { type: String, default: '+91 98765 43210' },
        email: { type: String, default: 'info@lucknowbaptist.org' }
    },

    socialMedia: {
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' },
        youtube: { type: String, default: '' },
        linkedin: { type: String, default: '' }
    }
}, {
    timestamps: true
});

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

export default SiteConfig;
