import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';
import Sermon from '../models/Sermon.js';

const getSitemap = asyncHandler(async (req, res) => {
    const baseUrl = process.env.CLIENT_URL || 'https://lucknow-baptist-church.vercel.app'; // Fallback to a known URL or localhost

    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt');
    const sermons = await Sermon.find({ isPublished: true }).select('slug updatedAt');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/sermons</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
       <url>
        <loc>${baseUrl}/blogs</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`;

    blogs.forEach(blog => {
        xml += `    <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
`;
    });

    sermons.forEach(sermon => {
        xml += `    <url>
        <loc>${baseUrl}/sermons/${sermon.slug}</loc>
        <lastmod>${new Date(sermon.updatedAt).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
});

export { getSitemap };
