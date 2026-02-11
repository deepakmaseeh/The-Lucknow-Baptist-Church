import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { getApiUrl } from '../utils/api';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(getApiUrl('/api/blogs'));
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        
        {/* HERO SECTION - Using inline styles for guaranteed visibility */}
        <div style={{
          height: '50vh',
          minHeight: '400px',
          width: '100%',
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1500&q=80')`, /* Open Bible/Book with Text */
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          marginBottom: '60px'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '4rem', 
              marginBottom: '10px', 
              fontFamily: 'var(--font-heading)',
              textShadow: '0 4px 15px rgba(0,0,0,0.5)',
              color: '#ffffff'
            }}>
              Our Blog
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto', 
              opacity: 1,
              fontWeight: 400,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              color: '#f0f0f0' 
            }}>
              Stories, devotionals, and updates from the heart of our church community.
            </p>
          </div>
        </div>

        {/* BLOG GRID SECTION */}
        <section style={{ paddingBottom: '80px', backgroundColor: 'var(--beige-bg)' }}>
          <div className="container">
            
            {/* Filter/Categories Placeholder (Visual Only) */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
               <button className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>All Posts</button>
               <button className="btn-outline-dark" style={{ color: '#333', borderColor: '#ddd' }}>Devotionals</button>
               <button className="btn-outline-dark" style={{ color: '#333', borderColor: '#ddd' }}>News</button>
               <button className="btn-outline-dark" style={{ color: '#333', borderColor: '#ddd' }}>Events</button>
            </div>

            {/* Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#666' }}>Loading posts...</div>
            ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '40px' 
            }}>
              {posts.map(post => (
                <article key={post._id} style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.03)'
                }}
                className="blog-card-hover" // We can add a hover effect in CSS or just leave standard
                >
                  {/* Image */}
                  <div style={{ 
                    height: '240px', 
                    background: `url(${post.image || 'https://via.placeholder.com/800x600'}) center/cover no-repeat`,
                    position: 'relative'
                  }}>
                    <span style={{ 
                      position: 'absolute', 
                      top: '20px', 
                      right: '20px', 
                      background: 'white', 
                      padding: '6px 14px', 
                      borderRadius: '50px', 
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: 'var(--primary-color)',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#888', marginBottom: '15px' }}>
                      <span>{post.date}</span>
                      <span>{post.author}</span>
                    </div>

                    <h2 style={{ 
                      fontSize: '1.5rem', 
                      marginBottom: '15px', 
                      fontFamily: 'var(--font-main)', 
                      fontWeight: '700',
                      lineHeight: '1.3',
                      color: 'var(--primary-color)'
                    }}>
                      {post.title}
                    </h2>

                    <p style={{ 
                      color: '#666', 
                      lineHeight: '1.6', 
                      marginBottom: '25px',
                      fontSize: '1rem' 
                    }}>
                      {post.content ? post.content.substring(0, 100) + '...' : ''}
                    </p>

                    <Link to={`/blog/${post._id}`} style={{ 
                      textDecoration: 'none', 
                      color: 'var(--gold-color)', 
                      fontWeight: '700', 
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      READ MORE →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            )}

            {/* Pagination / Load More */}
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button className="btn-outline-dark" style={{ borderColor: '#aaa', color: '#666' }}>Load More Posts</button>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Blog;
