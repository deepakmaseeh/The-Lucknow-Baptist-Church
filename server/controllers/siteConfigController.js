import asyncHandler from 'express-async-handler';
import SiteConfig from '../models/SiteConfig.js';

// @desc    Get public site settings
// @route   GET /api/settings/public
// @access  Public
const getSiteSettings = asyncHandler(async (req, res) => {
    // We expect only one config document to exist.
    // If not, we return a default object or create one on the fly.
    let config = await SiteConfig.findOne();

    if (!config) {
        // If no config exists, create a default one
        config = await SiteConfig.create({});
    }

    res.json(config);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSiteSettings = asyncHandler(async (req, res) => {
    let config = await SiteConfig.findOne();

    if (config) {
        config.siteName = req.body.siteName || config.siteName;
        config.tagline = req.body.tagline || config.tagline;
        config.logoUrl = req.body.logoUrl !== undefined ? req.body.logoUrl : config.logoUrl;
        config.faviconUrl = req.body.faviconUrl !== undefined ? req.body.faviconUrl : config.faviconUrl;

        // Update Theme
        if (req.body.theme) {
            config.theme.primaryColor = req.body.theme.primaryColor || config.theme.primaryColor;
            config.theme.secondaryColor = req.body.theme.secondaryColor || config.theme.secondaryColor;
            config.theme.backgroundColor = req.body.theme.backgroundColor || config.theme.backgroundColor;
            config.theme.fontHeading = req.body.theme.fontHeading || config.theme.fontHeading;
            config.theme.fontBody = req.body.theme.fontBody || config.theme.fontBody;
        }

        // Update Contact
        if (req.body.contact) {
            config.contact.address = req.body.contact.address || config.contact.address;
            config.contact.phone = req.body.contact.phone || config.contact.phone;
            config.contact.email = req.body.contact.email || config.contact.email;
            if (req.body.contact.socialLinks) {
                config.contact.socialLinks.facebook = req.body.contact.socialLinks.facebook || config.contact.socialLinks.facebook;
                config.contact.socialLinks.youtube = req.body.contact.socialLinks.youtube || config.contact.socialLinks.youtube;
                config.contact.socialLinks.instagram = req.body.contact.socialLinks.instagram || config.contact.socialLinks.instagram;
            }
        }

        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } else {
        // Should generally not happen if getSiteSettings creates one, but good safeguard
        const newConfig = await SiteConfig.create(req.body);
        res.status(201).json(newConfig);
    }
});

export { getSiteSettings, updateSiteSettings };
