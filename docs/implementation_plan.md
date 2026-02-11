# Phase 6: Advanced CMS Features - Implementation Plan

## Overview
This plan outlines the implementation of 8 enterprise-level features to transform the CMS into a professional-grade content management platform.

---

## 1. 📝 Revision History - Version Control for Posts

### Goal
Track all changes to blog posts and sermons with full revision history, comparison, and rollback capabilities.

### Database Schema

#### New Model: `Revision.js`
```javascript
{
  contentType: String,        // 'blog' or 'sermon'
  contentId: ObjectId,         // Reference to Blog/Sermon
  version: Number,             // Sequential version number
  data: Mixed,                 // Complete snapshot of content
  changedBy: ObjectId,         // User who made the change
  changeType: String,          // 'created', 'updated', 'restored'
  changesSummary: String,      // Auto-generated or manual description
  createdAt: Date
}
```

### Backend Implementation

#### Revision Middleware (`revisionMiddleware.js`)
- Intercept all Blog/Sermon updates
- Create snapshot before changes
- Auto-increment version number
- Track field-level changes

#### Revision Controller (`revisionController.js`)
- `GET /api/revisions/:contentType/:id` - List all revisions
- `GET /api/revisions/:id` - Get specific revision
- `POST /api/revisions/:id/restore` - Restore to revision
- `GET /api/revisions/:id/compare/:otherId` - Compare two revisions

### Frontend Implementation

#### Components
- `RevisionHistory.jsx` - Timeline view of all revisions
- `RevisionCompare.jsx` - Side-by-side diff view
- `RevisionRestore.jsx` - Confirmation modal

#### Integration
- Add "History" button to ManageBlogs/ManageSermons
- Show version number in editor
- Display "Last edited by X at Y" info

### Technical Considerations
- **Storage**: Revisions can grow large - consider retention policy (e.g., keep last 50)
- **Diff Algorithm**: Use `diff` library for text comparison
- **Performance**: Index by contentId and version

---

## 2. 🔄 Workflow States - Draft → Review → Approved → Published

### Goal
Implement editorial workflow with role-based approval process.

### Database Schema Updates

#### Blog/Sermon Models
```javascript
{
  workflowState: {
    type: String,
    enum: ['draft', 'review', 'approved', 'published', 'archived'],
    default: 'draft'
  },
  assignedTo: ObjectId,        // Editor/reviewer
  submittedAt: Date,
  reviewedAt: Date,
  approvedBy: ObjectId,
  rejectionReason: String,
  workflowHistory: [{
    state: String,
    changedBy: ObjectId,
    changedAt: Date,
    comment: String
  }]
}
```

#### User Model Enhancement
```javascript
{
  role: {
    type: String,
    enum: ['admin', 'editor', 'author', 'reviewer'],
    default: 'author'
  },
  permissions: [String]        // ['create', 'edit', 'approve', 'publish']
}
```

### Backend Implementation

#### Workflow Controller (`workflowController.js`)
- `POST /api/workflow/:id/submit` - Submit for review
- `POST /api/workflow/:id/approve` - Approve content
- `POST /api/workflow/:id/reject` - Reject with reason
- `POST /api/workflow/:id/publish` - Publish approved content
- `GET /api/workflow/pending` - Get items pending review

#### Middleware
- `checkPermissions.js` - Role-based access control
- State transition validation

### Frontend Implementation

#### Components
- `WorkflowStatus.jsx` - Visual workflow indicator
- `WorkflowActions.jsx` - State transition buttons
- `ReviewQueue.jsx` - Dashboard for reviewers
- `WorkflowTimeline.jsx` - History of state changes

#### Admin Dashboard
- "Pending Review" widget
- "My Drafts" section
- Workflow statistics

### Workflow Rules
1. **Author** → Create draft → Submit for review
2. **Reviewer** → Approve/Reject
3. **Editor** → Publish approved content
4. **Admin** → Can bypass all states

---

## 3. 🧱 Rich Media Blocks - Block-based Editor (Notion-style)

### Goal
Replace ReactQuill with a modern block-based editor supporting rich media.

### Database Schema

#### Content Structure
```javascript
{
  content: [{
    id: String,                // Unique block ID
    type: String,              // 'paragraph', 'heading', 'image', 'video', 'quote', 'code', 'embed'
    data: {
      text: String,            // For text blocks
      level: Number,           // For headings (1-6)
      url: String,             // For media blocks
      caption: String,
      alignment: String,
      style: Object            // Custom styling
    },
    order: Number
  }]
}
```

### Frontend Implementation

#### Block Editor (`BlockEditor.jsx`)
- Use **Editor.js** or **Slate.js** framework
- Drag-and-drop reordering
- Inline toolbar
- Slash commands (type `/` for block menu)

#### Block Types
- **Text Blocks**: Paragraph, Heading (H1-H6), Quote, List
- **Media Blocks**: Image, Video, Audio, File
- **Embed Blocks**: YouTube, Vimeo, Twitter, Instagram
- **Layout Blocks**: Columns, Divider, Spacer
- **Advanced**: Code, Table, Callout, Toggle

#### Block Renderers (`blocks/`)
- `ParagraphBlock.jsx`
- `ImageBlock.jsx`
- `VideoBlock.jsx`
- `EmbedBlock.jsx`
- etc.

### Migration Strategy
1. Create migration script to convert HTML to blocks
2. Support both formats during transition
3. Gradual rollout to admin users

### Libraries to Consider
- **Editor.js** - Lightweight, extensible
- **Slate.js** - More control, steeper learning curve
- **TipTap** - ProseMirror-based, rich features

---

## 4. 📊 Analytics Dashboard - Track Views, Referrers, etc.

### Goal
Track content performance with detailed analytics.

### Database Schema

#### Analytics Model (`Analytics.js`)
```javascript
{
  contentType: String,
  contentId: ObjectId,
  event: String,               // 'view', 'share', 'download'
  userId: ObjectId,            // If logged in
  sessionId: String,
  ipAddress: String,
  userAgent: String,
  referrer: String,
  country: String,
  device: String,              // 'mobile', 'tablet', 'desktop'
  timestamp: Date
}
```

#### Aggregated Stats (`ContentStats.js`)
```javascript
{
  contentId: ObjectId,
  totalViews: Number,
  uniqueViews: Number,
  avgTimeOnPage: Number,
  topReferrers: [{ url: String, count: Number }],
  deviceBreakdown: { mobile: Number, tablet: Number, desktop: Number },
  lastUpdated: Date
}
```

### Backend Implementation

#### Analytics Middleware (`analyticsMiddleware.js`)
- Track page views automatically
- Extract device/location from headers
- Use IP geolocation API

#### Analytics Controller (`analyticsController.js`)
- `POST /api/analytics/track` - Track event
- `GET /api/analytics/:contentId` - Get content stats
- `GET /api/analytics/dashboard` - Overall stats
- `GET /api/analytics/top-content` - Most viewed

### Frontend Implementation

#### Dashboard Components
- `AnalyticsDashboard.jsx` - Main analytics page
- `ViewsChart.jsx` - Line chart (Chart.js/Recharts)
- `TopContent.jsx` - Most popular posts
- `ReferrerTable.jsx` - Traffic sources
- `DevicePieChart.jsx` - Device breakdown

#### Integration
- Add "Analytics" link to admin sidebar
- Show view count on blog cards
- Display stats in ManageBlogs/ManageSermons

### Privacy Considerations
- **GDPR Compliance**: Anonymize IP addresses
- **Cookie Consent**: Implement consent banner
- **Data Retention**: Auto-delete after 90 days

---

## 5. 🎙️ Podcast RSS Feed - iTunes-compliant Feed

### Goal
Generate iTunes-compliant RSS feed for sermon podcast distribution.

### Database Schema

#### Podcast Settings (`PodcastConfig.js`)
```javascript
{
  title: String,
  description: String,
  author: String,
  email: String,
  category: String,
  subcategory: String,
  language: String,
  copyright: String,
  imageUrl: String,            // 1400x1400 minimum
  explicit: Boolean,
  itunesUrl: String,
  spotifyUrl: String
}
```

#### Sermon Enhancement
```javascript
{
  audioUrl: String,            // Direct MP3 link
  duration: Number,            // In seconds
  fileSize: Number,            // In bytes
  episodeNumber: Number,
  seasonNumber: Number,
  episodeType: String          // 'full', 'trailer', 'bonus'
}
```

### Backend Implementation

#### RSS Generator (`rssController.js`)
```javascript
// GET /api/podcast/feed.xml
- Generate XML with iTunes tags
- Include all published sermons
- Sort by date (newest first)
- Validate against iTunes spec
```

#### iTunes Tags Required
```xml
<itunes:author>
<itunes:summary>
<itunes:image href="">
<itunes:category>
<itunes:explicit>
<enclosure url="" length="" type="audio/mpeg">
<itunes:duration>
```

### Frontend Implementation

#### Admin Components
- `PodcastSettings.jsx` - Configure podcast metadata
- `EpisodeManager.jsx` - Manage sermon episodes
- Add audio upload to ManageSermons

#### Public Display
- Podcast subscribe buttons
- RSS feed link
- iTunes/Spotify badges

### Validation & Testing
- Use **Podbase** or **Cast Feed Validator**
- Test in Apple Podcasts Connect
- Verify Spotify compatibility

---

## 6. 🎬 Video Transcoding - HLS/DASH Streaming

### Goal
Transcode uploaded videos into adaptive bitrate streaming formats.

### Architecture

#### Option A: Cloud Service (Recommended)
- **AWS MediaConvert** - Pay per minute
- **Cloudflare Stream** - $1/1000 minutes
- **Mux** - Developer-friendly API

#### Option B: Self-hosted
- **FFmpeg** - Open source
- **Node-fluent-ffmpeg** - Node.js wrapper
- Requires significant server resources

### Database Schema

#### Video Model (`Video.js`)
```javascript
{
  originalUrl: String,
  status: String,              // 'uploading', 'processing', 'ready', 'failed'
  formats: [{
    quality: String,           // '1080p', '720p', '480p', '360p'
    url: String,
    bitrate: Number,
    fileSize: Number
  }],
  hlsManifest: String,         // .m3u8 file
  dashManifest: String,        // .mpd file
  thumbnail: String,
  duration: Number,
  processingProgress: Number
}
```

### Backend Implementation

#### Transcoding Service (`transcodingService.js`)
```javascript
- Upload video to cloud storage
- Trigger transcoding job
- Webhook for completion
- Generate HLS/DASH manifests
- Extract thumbnails
```

#### Video Controller (`videoController.js`)
- `POST /api/videos/upload` - Upload video
- `GET /api/videos/:id/status` - Check processing status
- `GET /api/videos/:id/manifest` - Get HLS manifest

### Frontend Implementation

#### Components
- `VideoUploader.jsx` - Drag-and-drop upload
- `VideoPlayer.jsx` - HLS player (Video.js/Plyr)
- `ProcessingStatus.jsx` - Progress indicator

#### Video Player Features
- Adaptive bitrate switching
- Quality selector
- Playback speed control
- Fullscreen support

### Cost Optimization
- Transcode only on-demand
- Cache manifests in CDN
- Use lower bitrates for older content

---

## 7. 🌍 Multi-language (i18n) - Full Internationalization

### Goal
Support multiple languages for UI and content.

### Architecture

#### UI Translation (i18next)
- Translate interface elements
- Language switcher in navbar
- Persist language preference

#### Content Translation
- Separate content per language
- Language-specific URLs
- Fallback to default language

### Database Schema

#### Content Translation
```javascript
{
  // Option 1: Separate documents
  language: String,            // 'en', 'hi', 'es'
  translationOf: ObjectId,     // Original content ID
  
  // Option 2: Embedded translations
  translations: {
    en: { title: String, content: String },
    hi: { title: String, content: String }
  }
}
```

### Backend Implementation

#### Language Middleware (`languageMiddleware.js`)
- Detect language from header/cookie/URL
- Set `req.language`

#### Content API Enhancement
- `GET /api/blogs?lang=hi` - Get Hindi blogs
- `GET /api/blogs/:slug?lang=hi` - Get translated post

### Frontend Implementation

#### Setup i18next
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

#### Translation Files (`locales/`)
```
/locales
  /en
    translation.json
  /hi
    translation.json
  /es
    translation.json
```

#### Components
- `LanguageSwitcher.jsx` - Dropdown selector
- Wrap app in `I18nextProvider`
- Use `useTranslation()` hook

#### Admin UI
- Translation editor
- Mark content as "needs translation"
- Translation status indicator

### URL Structure
- **Subdomain**: `hi.church.com`
- **Path**: `church.com/hi/blog`
- **Query**: `church.com/blog?lang=hi`

---

## 8. ⚡ Server-side Caching - Redis/Varnish Implementation

### Goal
Dramatically improve performance with intelligent caching.

### Architecture

#### Caching Layers
1. **Application Cache** (Redis) - API responses, database queries
2. **CDN Cache** (Cloudflare) - Static assets, images
3. **Browser Cache** - Client-side caching headers

### Redis Setup

#### Installation
```bash
npm install redis
# Docker: docker run -d -p 6379:6379 redis
```

#### Cache Strategy
- **Cache-Aside**: Check cache → Miss → Query DB → Store in cache
- **Write-Through**: Update DB → Update cache
- **TTL**: Set expiration times

### Backend Implementation

#### Redis Client (`config/redis.js`)
```javascript
import { createClient } from 'redis';

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

export default client;
```

#### Cache Middleware (`cacheMiddleware.js`)
```javascript
const cacheMiddleware = (duration) => async (req, res, next) => {
  const key = `cache:${req.originalUrl}`;
  const cached = await redis.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  res.sendResponse = res.json;
  res.json = (data) => {
    redis.setex(key, duration, JSON.stringify(data));
    res.sendResponse(data);
  };
  
  next();
};
```

#### Cache Invalidation
```javascript
// Invalidate on content update
await redis.del('cache:/api/blogs');
await redis.del(`cache:/api/blogs/${slug}`);

// Pattern-based invalidation
const keys = await redis.keys('cache:/api/blogs*');
await redis.del(...keys);
```

### Caching Rules

#### What to Cache
- ✅ Blog list (5 min TTL)
- ✅ Individual blog posts (1 hour TTL)
- ✅ Sermon list (5 min TTL)
- ✅ Site config (1 hour TTL)
- ✅ Search results (10 min TTL)

#### What NOT to Cache
- ❌ Admin endpoints
- ❌ User-specific data
- ❌ Analytics tracking
- ❌ Authentication

### Monitoring

#### Cache Metrics
- Hit rate (target: >80%)
- Miss rate
- Eviction rate
- Memory usage

#### Tools
- **Redis Commander** - GUI for Redis
- **Redis Insight** - Official Redis GUI
- Custom dashboard in admin

---

## Implementation Priority

### Phase 6A: Foundation (Week 1-2)
1. ✅ Revision History
2. ✅ Workflow States
3. ✅ Server-side Caching

### Phase 6B: Content Enhancement (Week 3-4)
4. ✅ Rich Media Blocks
5. ✅ Podcast RSS Feed

### Phase 6C: Advanced Features (Week 5-6)
6. ✅ Analytics Dashboard
7. ✅ Multi-language (i18n)

### Phase 6D: Media Processing (Week 7-8)
8. ✅ Video Transcoding

---

## Technical Requirements

### Dependencies
```json
{
  "redis": "^4.6.0",
  "i18next": "^23.0.0",
  "react-i18next": "^13.0.0",
  "diff": "^5.1.0",
  "rss": "^1.2.2",
  "fluent-ffmpeg": "^2.1.2",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "@editorjs/editorjs": "^2.28.0"
}
```

### Infrastructure
- **Redis Server** (Docker or managed service)
- **FFmpeg** (if self-hosting transcoding)
- **S3/Cloud Storage** (for media files)
- **CDN** (Cloudflare/AWS CloudFront)

---

## Security Considerations

1. **Revision History**: Limit access to authorized users
2. **Workflow**: Enforce role-based permissions
3. **Analytics**: Anonymize PII, GDPR compliance
4. **Caching**: Never cache sensitive data
5. **Video**: Validate file types, scan for malware
6. **i18n**: Sanitize translated content

---

## Performance Targets

- **Page Load**: <2s (with caching)
- **API Response**: <200ms (cached), <500ms (uncached)
- **Video Start**: <3s (HLS)
- **Cache Hit Rate**: >80%
- **Uptime**: 99.9%

---

## Next Steps

1. Review and approve this plan
2. Set up development environment (Redis, etc.)
3. Begin Phase 6A implementation
4. Iterative testing and refinement

**Estimated Total Implementation Time**: 6-8 weeks
