# CMS & Blogging Platform Feature List

Here is a comprehensive list of features found in modern Content Management Systems (CMS). We can use this to prioritize what to build next.

## 1. Content Management (Core)
- [ ] **Rich Text Editor (WYSIWYG)**: Format text (bold, italic, headers), add links, tables, and embed media without writing HTML.
- [ ] **Editing & Updating**: Ability to edit existing blogs, sermons, and events after they are published.
- [ ] **Draft & Publish Status**: Save work as a "Draft" to finish later, or "Publish" to make it live immediately.
- [ ] **Delete Functionality**: Remove outdated or incorrect content (with a confirmation prompt).
- [ ] **Media Library**: A central place to view, delete, and reuse uploaded images and files.

## 2. Organization & Discovery
- [ ] **Categories & Tags**: Group posts by topic (e.g., "Faith", "Community", "Announcements") for easier navigation.
- [ ] **Search Function**: Admin search to find specific posts quickly in the dashboard.
- [ ] **Pagination**: Handle large numbers of posts efficiently on both the admin and public sides.

## 3. SEO & Metadata
- [ ] **Custom Slugs**: Editable URLs (e.g., `website.com/blog/my-custom-title`) for better SEO.
- [ ] **Meta Tags**: Custom titles and descriptions for search engines and social media sharing.
- [ ] **Featured Images**: dedicated support for social sharing thumbnails.

## 4. User Interaction (Optional but Recommended)
- [ ] **Comments System**: Allow users to comment on posts (requires moderation tools).
- [ ] **Social Sharing Buttons**: Easy way for readers to share posts on Facebook, Twitter, WhatsApp.
- [ ] **Newsletter Signup**: Embed forms to collect emails from the blog page.

## 5. Admin Functionality
- [ ] **Dashboard Overview**: Stats on total posts, views, or recent activity.
- [ ] **User Roles**: Separate "Admin" (can change site settings) from "Author" (can only write posts).
- [ ] **Profile Management**: Update admin password and email.

## Recommended Phase 1 Implementation
Based on your feedback about "not being able to edit", I recommend we prioritize:
1.  **Edit Functionality**: Add "Edit" buttons to the Blog and Sermon lists.
2.  **Rich Text Editor**: Integrate a tool like `React Quill` or `TinyMCE` for better writing.
3.  **Delete Functionality**: Add ability to remove posts.
