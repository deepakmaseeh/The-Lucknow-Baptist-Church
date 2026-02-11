import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Footer from '../components/Footer';
import { getApiUrl } from '../utils/api';
import SEO from '../components/SEO';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(getApiUrl(`/api/blogs/${slug}`));
        if (!response.ok) {
            throw new Error('Blog post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Fetch related posts
  useEffect(() => {
    if (post && post._id) {
      const fetchRelated = async () => {
        try {
          const response = await fetch(getApiUrl(`/api/blogs/${post._id}/related`));
          const data = await response.json();
          setRelatedPosts(data);
        } catch (error) {
          console.error('Error fetching related posts:', error);
        }
      };
      fetchRelated();
    }
  }, [post]);

  if (loading) {
    return (
        <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading post...</div>
        </div>
    );
  }

  if (error || !post) {
      return (
        <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', textAlign: 'center' }}>
            <div className="container">
                <h2>Post not found</h2>
                <p>The blog post you are looking for does not exist.</p>
                <Link to="/blog" className="btn-gold" style={{ marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}>Back to Blog</Link>
            </div>
        </div>
      );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image ? [post.image] : [],
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "author": [{
        "@type": "Person",
        "name": post.author
    }]
  };

  return (
    <>
      <SEO 
        title={post.title}
        description={`Read ${post.title} by ${post.author}.`}
        image={post.image}
        type="article"
        schema={structuredData}
      />
      <div className="page-wrapper" style={{ paddingTop: '80px', minHeight: '100vh', background: '#fff' }}>
        
        {/* Full Width Image Header if available */}
        {post.image && (
             <div style={{ 
                height: '50vh', 
                minHeight: '400px',
                width: '100%',
                background: `url(${post.image}) center/cover no-repeat`,
                marginBottom: '40px',
                position: 'relative'
             }}>
                 <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
             </div>
        )}

        <div className="container" style={{ maxWidth: '800px', paddingBottom: '80px' }}>
            
            {/* Metadata */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <span style={{ 
                    background: 'var(--gold-color)', 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '50px', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginBottom: '15px'
                }}>
                    {post.category || 'General'}
                </span>
                
                <h1 style={{ 
                    fontSize: '2.5rem', 
                    fontFamily: 'var(--font-heading)', 
                    color: 'var(--primary-color)',
                    marginBottom: '15px',
                    lineHeight: '1.2'
                }}>
                    {post.title}
                </h1>

                <div style={{ color: '#888', fontSize: '1rem', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <span>By <strong>{post.author}</strong></span>
                    <span>•</span>
                    <span>{post.date}</span>
                </div>
            </div>

            {/* Content - Rich Text Rendering */}
            <div 
                style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8', 
                    color: '#444', 
                    marginTop: '40px',
                    wordWrap: 'break-word'
                }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />

            <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
                <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    ← Back to All Posts
                </Link>
            </div>

        </div>

        <Footer />
      </div>
    </>
  );
}

export default BlogPost;
