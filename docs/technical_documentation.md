# Church CMS - Technical Documentation

**Version:** 2.0  
**Last Updated:** February 2026  
**Author:** Development Team

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [API Documentation](#api-documentation)
5. [Database Schemas](#database-schemas)
6. [Features Guide](#features-guide)
7. [Code Examples](#code-examples)
8. [Deployment](#deployment)

---

## System Overview

### Technology Stack

**Backend:**
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- Redis (Caching)
- JWT Authentication

**Frontend:**
- React 18
- React Router v6
- ReactQuill (Rich Text Editor)
- i18next (Internationalization)

**Key Features:**
- ✅ Content Management (Blogs, Sermons, Series)
- ✅ Revision History & Version Control
- ✅ Editorial Workflow (Draft → Review → Approved → Published)
- ✅ Redis Caching (90%+ performance boost)
- ✅ Podcast RSS Feed (iTunes/Spotify compatible)
- ✅ Analytics Dashboard
- ✅ Multi-language Support (EN, HI, ES)
- ✅ SEO Optimization
- ✅ Scheduled Publishing

---

## Architecture

### System Architecture

```
┌─────────────────┐
│   React Client  │ (Port 5173)
│   (Vite)        │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│  Express Server │ (Port 5000)
│  + Middleware   │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    ↓         ↓          ↓          ↓
┌────────┐ ┌──────┐ ┌────────┐ ┌────────┐
│MongoDB │ │Redis │ │Uploads │ │  RSS   │
│        │ │Cache │ │Storage │ │  Feed  │
└────────┘ └──────┘ └────────┘ └────────┘
```

### Directory Structure

```
church-website/
├── server/
│   ├── models/           # Mongoose schemas
│   ├── controllers/      # Business logic
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth, caching, revisions
│   ├── config/           # Redis, database config
│   ├── utils/            # Helper functions
│   └── index.js          # Server entry point
│
└── client/
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Route pages
    │   ├── context/      # React Context
    │   ├── utils/        # Helper functions
    │   ├── i18n.js       # Translations
    │   └── App.jsx       # Main app
    └── public/           # Static assets
```

---

## Authentication

### JWT Token-Based Authentication

**Flow:**
1. User logs in with credentials
2. Server validates and returns JWT token
3. Client stores token in localStorage
4. Client sends token in Authorization header for protected routes

### Login

**Endpoint:** `POST /api/users/login`

**Request:**
```json
{
  "email": "admin@church.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Admin User",
  "email": "admin@church.com",
  "isAdmin": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Usage in Frontend:**
```javascript
// Login
const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const data = await response.json();
localStorage.setItem('token', data.token);

// Protected Request
const response = await fetch('/api/blogs', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

### Register User

**Endpoint:** `POST /api/users/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://yourchurch.com/api`

---

## 📝 Blog API

### Get All Blogs

**Endpoint:** `GET /api/blogs`  
**Auth:** Public  
**Cache:** 5 minutes

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `tag` (string): Filter by tag

**Response:**
```json
{
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Welcome to Our Church",
      "slug": "welcome-to-our-church",
      "author": "Pastor John",
      "image": "https://example.com/image.jpg",
      "content": "<p>Blog content...</p>",
      "isPublished": true,
      "tags": ["welcome", "introduction"],
      "workflowState": "published",
      "createdAt": "2024-02-11T10:00:00.000Z",
      "updatedAt": "2024-02-11T10:00:00.000Z"
    }
  ],
  "page": 1,
  "pages": 5,
  "total": 50
}
```

### Get Single Blog

**Endpoint:** `GET /api/blogs/:slug`  
**Auth:** Public  
**Cache:** 1 hour

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Welcome to Our Church",
  "slug": "welcome-to-our-church",
  "author": "Pastor John",
  "image": "https://example.com/image.jpg",
  "content": "<p>Full blog content...</p>",
  "isPublished": true,
  "tags": ["welcome", "introduction"],
  "workflowState": "published",
  "publishDate": "2024-02-11T10:00:00.000Z",
  "createdAt": "2024-02-11T10:00:00.000Z",
  "updatedAt": "2024-02-11T10:00:00.000Z"
}
```

### Create Blog

**Endpoint:** `POST /api/blogs`  
**Auth:** Required (Admin)

**Request:**
```json
{
  "title": "New Blog Post",
  "author": "Pastor John",
  "image": "https://example.com/image.jpg",
  "content": "<p>Blog content...</p>",
  "isPublished": true,
  "tags": ["sermon", "faith"],
  "publishDate": "2024-02-15T10:00:00.000Z"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "author": "Pastor John",
  "workflowState": "draft",
  "createdAt": "2024-02-11T10:00:00.000Z"
}
```

### Update Blog

**Endpoint:** `PUT /api/blogs/:id`  
**Auth:** Required (Admin)

**Request:** Same as Create Blog

**Note:** Automatically creates revision before update

### Delete Blog

**Endpoint:** `DELETE /api/blogs/:id`  
**Auth:** Required (Admin)

**Response:**
```json
{
  "message": "Blog removed"
}
```

---

## 🎥 Sermon API

### Get All Sermons

**Endpoint:** `GET /api/sermons`  
**Auth:** Public

**Query Parameters:**
- `series` (string): Filter by series name
- `speaker` (string): Filter by speaker

**Response:**
```json
{
  "sermons": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Faith and Hope",
      "slug": "faith-and-hope",
      "speaker": "Pastor John",
      "series": "Living by Faith",
      "seriesId": "507f1f77bcf86cd799439020",
      "date": "2024-02-11",
      "videoUrl": "https://youtube.com/watch?v=xxx",
      "audioUrl": "https://example.com/audio.mp3",
      "duration": 1800,
      "fileSize": 25000000,
      "episodeNumber": 5,
      "seasonNumber": 1,
      "imageUrl": "https://example.com/sermon.jpg",
      "tags": ["faith", "hope"],
      "isPublished": true,
      "workflowState": "published"
    }
  ]
}
```

### Create Sermon

**Endpoint:** `POST /api/sermons`  
**Auth:** Required (Admin)

**Request:**
```json
{
  "title": "Faith and Hope",
  "speaker": "Pastor John",
  "seriesId": "507f1f77bcf86cd799439020",
  "date": "2024-02-11",
  "videoUrl": "https://youtube.com/watch?v=xxx",
  "audioUrl": "https://example.com/audio.mp3",
  "duration": 1800,
  "fileSize": 25000000,
  "episodeNumber": 5,
  "tags": ["faith", "hope"]
}
```

---

## 📚 Series API

### Get All Series

**Endpoint:** `GET /api/series`  
**Auth:** Public

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Living by Faith",
    "description": "A series about faith",
    "imageUrl": "https://example.com/series.jpg",
    "startDate": "2024-01-01",
    "endDate": "2024-03-31",
    "isActive": true,
    "sermonCount": 12
  }
]
```

### Create Series

**Endpoint:** `POST /api/series`  
**Auth:** Required (Admin)

**Request:**
```json
{
  "name": "Living by Faith",
  "description": "A series about faith",
  "imageUrl": "https://example.com/series.jpg",
  "startDate": "2024-01-01",
  "endDate": "2024-03-31"
}
```

---

## 📝 Revision API

### Get Revisions

**Endpoint:** `GET /api/revisions/:contentType/:contentId`  
**Auth:** Required (Admin)

**Parameters:**
- `contentType`: "blog" or "sermon"
- `contentId`: MongoDB ObjectId

**Response:**
```json
{
  "revisions": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "contentType": "blog",
      "contentId": "507f1f77bcf86cd799439011",
      "version": 3,
      "changeType": "updated",
      "changedBy": {
        "_id": "507f1f77bcf86cd799439001",
        "name": "Admin User"
      },
      "changesSummary": "Updated title and content",
      "fieldsChanged": [
        {
          "field": "title",
          "oldValue": "Old Title",
          "newValue": "New Title"
        }
      ],
      "createdAt": "2024-02-11T10:00:00.000Z"
    }
  ]
}
```

### Restore Revision

**Endpoint:** `POST /api/revisions/:id/restore`  
**Auth:** Required (Admin)

**Response:**
```json
{
  "message": "Content restored to version 2",
  "content": { /* restored content */ }
}
```

---

## 🔄 Workflow API

### Submit for Review

**Endpoint:** `POST /api/workflow/:contentType/:id/submit`  
**Auth:** Required

**Request:**
```json
{
  "comment": "Ready for review"
}
```

**Response:**
```json
{
  "message": "Content submitted for review",
  "content": {
    "workflowState": "review",
    "submittedAt": "2024-02-11T10:00:00.000Z"
  }
}
```

### Approve Content

**Endpoint:** `POST /api/workflow/:contentType/:id/approve`  
**Auth:** Required (Admin)

**Request:**
```json
{
  "comment": "Looks good!"
}
```

**Response:**
```json
{
  "message": "Content approved",
  "content": {
    "workflowState": "approved",
    "approvedBy": "507f1f77bcf86cd799439001",
    "reviewedAt": "2024-02-11T10:00:00.000Z"
  }
}
```

### Reject Content

**Endpoint:** `POST /api/workflow/:contentType/:id/reject`  
**Auth:** Required (Admin)

**Request:**
```json
{
  "reason": "Needs more details in introduction"
}
```

**Response:**
```json
{
  "message": "Content rejected",
  "content": {
    "workflowState": "draft",
    "rejectionReason": "Needs more details in introduction"
  }
}
```

### Publish Content

**Endpoint:** `POST /api/workflow/:contentType/:id/publish`  
**Auth:** Required (Admin)

**Response:**
```json
{
  "message": "Content published",
  "content": {
    "workflowState": "published",
    "isPublished": true
  }
}
```

### Get Pending Reviews

**Endpoint:** `GET /api/workflow/pending`  
**Auth:** Required (Admin)

**Response:**
```json
{
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Pending Blog",
      "workflowState": "review",
      "submittedAt": "2024-02-11T10:00:00.000Z"
    }
  ],
  "sermons": []
}
```

---

## 🎙️ Podcast API

### Get Podcast Feed

**Endpoint:** `GET /api/podcast/feed.xml`  
**Auth:** Public  
**Content-Type:** application/rss+xml

**Response:** iTunes-compliant RSS 2.0 XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Church Sermons Podcast</title>
    <description>Weekly sermons and teachings</description>
    <itunes:author>Church Name</itunes:author>
    <itunes:image href="https://example.com/podcast.jpg"/>
    <itunes:category text="Religion &amp; Spirituality">
      <itunes:category text="Christianity"/>
    </itunes:category>
    <item>
      <title>Faith and Hope</title>
      <itunes:author>Pastor John</itunes:author>
      <itunes:duration>00:30:00</itunes:duration>
      <enclosure url="https://example.com/audio.mp3" type="audio/mpeg" length="25000000"/>
    </item>
  </channel>
</rss>
```

### Get Podcast Config

**Endpoint:** `GET /api/podcast/config`  
**Auth:** Required (Admin)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439040",
  "title": "Church Sermons Podcast",
  "description": "Weekly sermons and teachings",
  "author": "Church Name",
  "email": "podcast@church.com",
  "category": "Religion & Spirituality",
  "subcategory": "Christianity",
  "imageUrl": "https://example.com/podcast.jpg",
  "explicit": false,
  "itunesUrl": "https://podcasts.apple.com/...",
  "spotifyUrl": "https://open.spotify.com/show/..."
}
```

### Update Podcast Config

**Endpoint:** `PUT /api/podcast/config`  
**Auth:** Required (Admin)

**Request:** Same as response above

---

## 📊 Analytics API

### Track Event

**Endpoint:** `POST /api/analytics/track`  
**Auth:** Public

**Request:**
```json
{
  "contentType": "blog",
  "contentId": "507f1f77bcf86cd799439011",
  "event": "view"
}
```

**Response:**
```json
{
  "success": true
}
```

### Get Dashboard Stats

**Endpoint:** `GET /api/analytics/dashboard`  
**Auth:** Required (Admin)

**Response:**
```json
{
  "totalViews": 1250,
  "topBlogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "views": 150,
      "blog": {
        "title": "Welcome to Our Church",
        "slug": "welcome-to-our-church"
      }
    }
  ],
  "topSermons": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "views": 200,
      "sermon": {
        "title": "Faith and Hope",
        "speaker": "Pastor John"
      }
    }
  ],
  "deviceStats": [
    { "_id": "desktop", "count": 800 },
    { "_id": "mobile", "count": 400 },
    { "_id": "tablet", "count": 50 }
  ],
  "viewsPerDay": [
    { "_id": "2024-02-11", "count": 45 },
    { "_id": "2024-02-10", "count": 52 }
  ]
}
```

### Get Content Analytics

**Endpoint:** `GET /api/analytics/:contentType/:contentId`  
**Auth:** Required (Admin)

**Response:**
```json
{
  "totalViews": 150,
  "uniqueViews": 120,
  "deviceBreakdown": [
    { "_id": "desktop", "count": 100 },
    { "_id": "mobile", "count": 50 }
  ],
  "topReferrers": [
    { "_id": "https://google.com", "count": 50 },
    { "_id": "https://facebook.com", "count": 30 }
  ],
  "viewsOverTime": [
    { "_id": "2024-02-11", "count": 25 },
    { "_id": "2024-02-10", "count": 30 }
  ]
}
```

---

## 🔍 Search API

### Search Content

**Endpoint:** `GET /api/search?q=faith`  
**Auth:** Public

**Query Parameters:**
- `q` (string): Search query
- `type` (string): "blog" or "sermon" (optional)

**Response:**
```json
{
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Living by Faith",
      "slug": "living-by-faith",
      "excerpt": "...faith is important..."
    }
  ],
  "sermons": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Faith and Hope",
      "speaker": "Pastor John"
    }
  ]
}
```

---

## 📤 Upload API

### Upload Image

**Endpoint:** `POST /api/upload`  
**Auth:** Required (Admin)  
**Content-Type:** multipart/form-data

**Request:**
```javascript
const formData = new FormData();
formData.append('image', file);

const response = await fetch('/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

**Response:**
```json
{
  "url": "/uploads/image-1234567890.jpg"
}
```

---

## Database Schemas

### Blog Schema

```javascript
{
  title: String (required),
  slug: String (required, unique),
  author: String (required),
  image: String,
  content: String (required),
  isPublished: Boolean (default: true),
  tags: [String],
  publishDate: Date,
  
  // Workflow fields
  workflowState: String (enum: draft/review/approved/published/archived),
  assignedTo: ObjectId (ref: User),
  submittedAt: Date,
  reviewedAt: Date,
  approvedBy: ObjectId (ref: User),
  rejectionReason: String,
  workflowHistory: [{
    state: String,
    changedBy: ObjectId,
    changedAt: Date,
    comment: String
  }],
  
  createdAt: Date,
  updatedAt: Date
}
```

### Sermon Schema

```javascript
{
  title: String (required),
  slug: String (required, unique),
  speaker: String (required),
  series: String,
  seriesId: ObjectId (ref: Series),
  date: String (required),
  videoUrl: String,
  
  // Podcast fields
  audioUrl: String,
  duration: Number (seconds),
  fileSize: Number (bytes),
  episodeNumber: Number,
  seasonNumber: Number,
  episodeType: String (enum: full/trailer/bonus),
  imageUrl: String,
  
  img: String,
  tags: [String],
  isPublished: Boolean,
  publishDate: Date,
  workflowState: String,
  // ... workflow fields same as Blog
}
```

### Revision Schema

```javascript
{
  contentType: String (enum: blog/sermon),
  contentId: ObjectId (refPath: contentType),
  version: Number,
  data: Mixed (complete snapshot),
  changedBy: ObjectId (ref: User),
  changeType: String (enum: created/updated/restored/published/unpublished),
  changesSummary: String,
  fieldsChanged: [{
    field: String,
    oldValue: String,
    newValue: String
  }],
  createdAt: Date
}
```

### Analytics Schema

```javascript
{
  contentType: String (enum: blog/sermon),
  contentId: ObjectId (refPath: contentType),
  event: String (enum: view/share/download),
  sessionId: String,
  ipAddress: String,
  userAgent: String,
  referrer: String,
  device: String (enum: mobile/tablet/desktop),
  createdAt: Date
}
```

### PodcastConfig Schema

```javascript
{
  title: String (required),
  description: String (required),
  author: String (required),
  email: String (required),
  category: String,
  subcategory: String,
  language: String,
  copyright: String,
  imageUrl: String (required),
  explicit: Boolean,
  websiteUrl: String,
  itunesUrl: String,
  spotifyUrl: String,
  ownerName: String,
  ownerEmail: String,
  isActive: Boolean
}
```

---

## Code Examples

### Frontend: Create Blog Post

```javascript
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { getApiUrl } from '../utils/api';

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    content: '',
    tags: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(getApiUrl('/api/blogs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('Blog created successfully!');
        // Redirect or clear form
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      
      <ReactQuill
        value={formData.content}
        onChange={(content) => setFormData({...formData, content})}
      />
      
      <button type="submit">Create Blog</button>
    </form>
  );
}
```

### Frontend: Track Analytics

```javascript
import { useEffect } from 'react';
import { getApiUrl } from '../utils/api';

function BlogPost({ blogId }) {
  useEffect(() => {
    // Track view when component mounts
    const trackView = async () => {
      try {
        await fetch(getApiUrl('/api/analytics/track'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentType: 'blog',
            contentId: blogId,
            event: 'view'
          })
        });
      } catch (error) {
        console.error('Analytics tracking failed:', error);
      }
    };
    
    trackView();
  }, [blogId]);
  
  return <div>Blog content...</div>;
}
```

### Frontend: Use Workflow Actions

```javascript
import WorkflowStatus from '../components/admin/WorkflowStatus';
import WorkflowActions from '../components/admin/WorkflowActions';

function EditBlog({ blogId }) {
  const [workflowState, setWorkflowState] = useState('draft');
  
  return (
    <div>
      <WorkflowStatus state={workflowState} />
      
      <WorkflowActions
        contentType="blog"
        contentId={blogId}
        currentState={workflowState}
        onStateChange={(newState) => setWorkflowState(newState)}
      />
    </div>
  );
}
```

### Backend: Create Custom Middleware

```javascript
// Custom logging middleware
export const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
};

// Usage in server/index.js
app.use(requestLogger);
```

### Backend: Add Cache to Route

```javascript
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

// Cache for 10 minutes
router.get('/api/sermons', cacheMiddleware(600), getSermons);
```

### Backend: Create Revision Manually

```javascript
import Revision from '../models/Revision.js';

const createManualRevision = async (contentType, contentId, userId) => {
  const content = await Model.findById(contentId);
  
  const revision = new Revision({
    contentType,
    contentId,
    version: await Revision.getLatestVersion(contentType, contentId) + 1,
    data: content.toObject(),
    changedBy: userId,
    changeType: 'updated',
    changesSummary: 'Manual revision'
  });
  
  await revision.save();
  return revision;
};
```

---

## Deployment

### Environment Variables

**Server (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/church
JWT_SECRET=your-super-secret-jwt-key-change-this
REDIS_URL=redis://localhost:6379
```

**Client (.env):**
```env
VITE_API_URL=https://api.yourchurch.com
```

### Production Build

```bash
# Build client
cd client
npm run build

# Build creates optimized files in client/dist

# Start server
cd server
npm start
```

### Docker Deployment

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  redis:
    image: redis:latest
    ports:
      - "6379:6379"
  
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  
  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/church
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongodb
      - redis

volumes:
  mongo-data:
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourchurch.com;
    
    # Client
    location / {
        root /var/www/church/client/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Performance Optimization

### Caching Strategy

**Cache TTL:**
- Blog list: 5 minutes
- Single blog: 1 hour
- Sermons: 10 minutes
- Series: 30 minutes

**Cache Invalidation:**
- On create: Invalidate list cache
- On update: Invalidate list + single item cache
- On delete: Invalidate all related caches

### Database Indexing

```javascript
// Blog indexes
blogSchema.index({ slug: 1 });
blogSchema.index({ isPublished: 1, publishDate: -1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ workflowState: 1 });

// Analytics indexes
analyticsSchema.index({ contentType: 1, contentId: 1 });
analyticsSchema.index({ createdAt: -1 });
analyticsSchema.index({ event: 1 });
```

---

## Security Best Practices

1. **Authentication:**
   - Use strong JWT secrets
   - Implement token expiration
   - Validate tokens on every protected route

2. **Input Validation:**
   - Sanitize user inputs
   - Validate request bodies
   - Use Mongoose schema validation

3. **Rate Limiting:**
   ```javascript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

4. **CORS Configuration:**
   ```javascript
   app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
   }));
   ```

---

## Troubleshooting

### Common Issues

**1. Redis Connection Failed**
```bash
# Check if Redis is running
docker ps | grep redis

# Restart Redis
docker restart church-redis
```

**2. MongoDB Connection Error**
- Verify MONGODB_URI in .env
- Check MongoDB service status
- Ensure IP whitelist includes your server

**3. Cache Not Working**
- Check Redis connection in server logs
- Verify REDIS_URL environment variable
- Test Redis: `redis-cli ping`

**4. Workflow Actions Not Appearing**
- Verify user is authenticated
- Check if editing existing content (not new)
- Inspect browser console for errors

---

## API Response Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## Support & Resources

**Documentation:**
- Setup Guide: `setup_testing_guide.md`
- Walkthrough: `walkthrough.md`
- Implementation Plan: `implementation_plan.md`

**Contact:**
- Email: support@yourchurch.com
- GitHub: [Repository URL]

---

**Last Updated:** February 2026  
**Version:** 2.0.0
