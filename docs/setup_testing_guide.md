# Complete Setup & Testing Guide - Phase 6 Features

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js installed (v16+)
- MongoDB running
- Git Bash or PowerShell (Windows)
- Docker Desktop (recommended for Redis)

---

## 🚀 Step 1: Install Dependencies

### Server Dependencies
```bash
cd "f:\church website\server"
npm install redis rss
```

### Client Dependencies
```bash
cd "f:\church website\client"
npm install i18next react-i18next i18next-browser-languagedetector
```

---

## 🔧 Step 2: Setup Redis (3 Options)

### Option A: Docker (Recommended - Easiest)

**1. Install Docker Desktop:**
- Download from: https://www.docker.com/products/docker-desktop/
- Install and start Docker Desktop
- Wait for Docker to fully start (whale icon in system tray)

**2. Run Redis Container:**
```bash
docker run -d -p 6379:6379 --name church-redis redis
```

**3. Verify Redis is Running:**
```bash
docker ps
```
You should see `church-redis` in the list.

**4. Test Redis Connection:**
```bash
docker exec -it church-redis redis-cli ping
```
Should return: `PONG`

**To stop Redis:**
```bash
docker stop church-redis
```

**To start Redis again:**
```bash
docker start church-redis
```

**To remove Redis container:**
```bash
docker stop church-redis
docker rm church-redis
```

---

### Option B: Windows Native Installation

**1. Download Redis for Windows:**
- Go to: https://github.com/microsoftarchive/redis/releases
- Download: `Redis-x64-3.0.504.msi`

**2. Install Redis:**
- Run the installer
- Keep default settings
- Check "Add to PATH"

**3. Start Redis:**
```bash
redis-server
```

**4. Test Connection:**
Open new terminal:
```bash
redis-cli ping
```
Should return: `PONG`

---

### Option C: WSL (Windows Subsystem for Linux)

**1. Enable WSL:**
```powershell
wsl --install
```

**2. Install Redis in WSL:**
```bash
wsl
sudo apt update
sudo apt install redis-server
```

**3. Start Redis:**
```bash
sudo service redis-server start
```

**4. Test:**
```bash
redis-cli ping
```

---

## ⚙️ Step 3: Configure Environment Variables

### Server .env
Open `f:\church website\server\.env` and add:

```env
# Existing variables...
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# Add Redis URL
REDIS_URL=redis://localhost:6379
```

Save the file.

---

## 🏃 Step 4: Start the Application

### Terminal 1 - Start Server
```bash
cd "f:\church website\server"
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB connected
Redis connected successfully
```

### Terminal 2 - Start Client
```bash
cd "f:\church website\client"
npm run dev
```

**Expected output:**
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

---

## 🧪 Step 5: Test Each Feature

### Test 1: Revision History ✅

**Steps:**
1. Go to: `http://localhost:5173/admin/blogs/new`
2. Login if needed
3. Create a new blog post:
   - Title: "Test Blog"
   - Author: "Your Name"
   - Content: "Original content"
   - Click "Save"
4. After redirect, click "Edit" on your blog
5. Click "Show History" button
6. You should see 1 revision (created)
7. Edit the content to "Updated content"
8. Click "Save"
9. Click "Show History" again
10. You should see 2 revisions
11. Click on the first revision to view details
12. Click "Restore" to go back to original

**Expected Result:** Content reverts to "Original content"

---

### Test 2: Workflow States ✅

**Steps:**
1. Edit a blog post
2. Scroll down to "Workflow Status" section
3. You should see a badge showing "Draft" (gray)
4. Click "📤 Submit for Review" button
5. Badge should change to "In Review" (orange)
6. Click "✅ Approve" button
7. Badge should change to "Approved" (green)
8. Click "🌐 Publish" button
9. Badge should change to "Published" (blue)

**To test rejection:**
1. Create new blog, submit for review
2. Click "❌ Reject"
3. Enter reason: "Needs more details"
4. Click "Reject"
5. Badge should return to "Draft"

**Expected Result:** Workflow transitions work smoothly

---

### Test 3: Redis Caching ✅

**Steps:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit: `http://localhost:5173/blog`
4. Check server terminal logs
5. You should see: `Cache MISS: cache:/api/blogs`
6. Refresh the page (F5)
7. Check server logs again
8. You should see: `Cache HIT: cache:/api/blogs`
9. Response should be much faster (check Network tab timing)

**To test cache invalidation:**
1. Edit any blog post and save
2. Check server logs: `Cache invalidated: cache:/api/blogs*`
3. Visit `/blog` again
4. Should see "Cache MISS" (cache was cleared)
5. Refresh again
6. Should see "Cache HIT" (new cache created)

**Expected Result:** 
- First load: 200-500ms
- Cached load: 10-50ms (90% faster)

---

### Test 4: Podcast RSS Feed ✅

**Steps:**
1. Go to: `http://localhost:5173/admin/podcast`
2. Fill in podcast settings:
   - Title: "Church Sermons Podcast"
   - Description: "Weekly sermons and teachings"
   - Author: "Your Church Name"
   - Email: "podcast@yourchurch.com"
   - Image URL: (paste any image URL, 1400x1400 recommended)
3. Click "Save Podcast Settings"
4. Copy the feed URL from the top
5. Open new tab: `http://localhost:5000/api/podcast/feed.xml`
6. You should see XML feed

**To add sermon to podcast:**
1. Go to: `http://localhost:5173/admin/sermons/new`
2. Create sermon with:
   - Title: "Test Sermon"
   - Speaker: "Pastor Name"
   - Video URL: (any URL)
   - **Audio URL**: (paste MP3 link, e.g., from SoundCloud)
   - Duration: 1800 (30 minutes in seconds)
   - File Size: 25000000 (25MB in bytes)
3. Save sermon
4. Refresh feed URL
5. Sermon should appear in feed

**Validate feed:**
- Go to: https://podba.se/validate/
- Paste your feed URL
- Check for errors

**Expected Result:** Valid RSS 2.0 feed with iTunes tags

---

### Test 5: Analytics Dashboard ✅

**Steps:**
1. Go to: `http://localhost:5173/admin/analytics`
2. You should see dashboard with:
   - Total Views card
   - Device breakdown (desktop/mobile/tablet)
   - Top Blogs list
   - Top Sermons list
   - Views over time chart

**To generate analytics data:**
1. Open incognito window
2. Visit: `http://localhost:5173/blog`
3. Click on a blog post
4. Close incognito, open new one
5. Repeat 5-10 times with different blogs
6. Go back to `/admin/analytics`
7. Refresh the page
8. You should see view counts increase

**Expected Result:** Dashboard shows real-time statistics

---

### Test 6: Multi-language Support ✅

**Steps:**
1. Go to: `http://localhost:5173/`
2. Look at the navbar (top right)
3. You should see language buttons:
   - 🇬🇧 English
   - 🇮🇳 हिन्दी
   - 🇪🇸 Español
4. Click "🇮🇳 हिन्दी"
5. Navigation should change to Hindi
6. Click "🇪🇸 Español"
7. Navigation should change to Spanish
8. Click "🇬🇧 English" to return

**Check localStorage:**
1. Open DevTools (F12)
2. Go to Application tab
3. Check localStorage
4. You should see `language: "hi"` or selected language

**Expected Result:** Language switches instantly, preference saved

---

## 🔍 Troubleshooting

### Redis Connection Failed

**Error:** `Redis connection failed`

**Solution:**
```bash
# Check if Redis is running
docker ps

# If not running, start it
docker start church-redis

# Or run new container
docker run -d -p 6379:6379 --name church-redis redis
```

---

### Port Already in Use

**Error:** `Port 6379 already in use`

**Solution:**
```bash
# Find process using port
netstat -ano | findstr :6379

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or use different port in .env
REDIS_URL=redis://localhost:6380
```

---

### i18n Not Working

**Error:** Language switcher not appearing

**Solution:**
1. Check if dependencies installed:
```bash
cd client
npm list i18next
```

2. Verify import in `main.jsx`:
```javascript
import './i18n'
```

3. Restart client:
```bash
npm run dev
```

---

### Analytics Not Tracking

**Error:** No data in analytics dashboard

**Solution:**
1. Check MongoDB connection
2. Visit public pages (not admin)
3. Wait a few seconds
4. Refresh analytics dashboard
5. Check browser console for errors

---

## 📊 Performance Benchmarks

### Before Caching
- Blog list: 200-500ms
- Single blog: 100-300ms

### After Caching (with Redis)
- Blog list (cached): 10-50ms (90% faster)
- Single blog (cached): 5-20ms (95% faster)

### Cache Hit Rate
- Target: >80%
- Check server logs for hit/miss ratio

---

## 🎯 Quick Command Reference

### Redis Commands
```bash
# Start Redis (Docker)
docker start church-redis

# Stop Redis
docker stop church-redis

# Check Redis status
docker ps

# Test Redis connection
docker exec -it church-redis redis-cli ping

# View Redis data
docker exec -it church-redis redis-cli
> KEYS *
> GET cache:/api/blogs
```

### Application Commands
```bash
# Start server
cd "f:\church website\server"
npm run dev

# Start client
cd "f:\church website\client"
npm run dev

# Install dependencies
npm install
```

---

## ✅ Verification Checklist

- [ ] Redis running (docker ps shows church-redis)
- [ ] Server started (port 5000)
- [ ] Client started (port 5173)
- [ ] Can login to admin
- [ ] Revision history shows versions
- [ ] Workflow buttons work
- [ ] Cache logs show HIT/MISS
- [ ] Podcast feed accessible
- [ ] Analytics dashboard loads
- [ ] Language switcher works

---

## 🎉 Success Indicators

**You've successfully set up everything if:**

1. ✅ Server logs show "Redis connected successfully"
2. ✅ Revision history displays when editing blogs
3. ✅ Workflow status badge appears on edit pages
4. ✅ Cache logs show "Cache HIT" on repeated requests
5. ✅ `/api/podcast/feed.xml` returns valid XML
6. ✅ `/admin/analytics` shows dashboard
7. ✅ Language switcher changes navbar text

**Congratulations! Your CMS is fully operational with all enterprise features!** 🚀
