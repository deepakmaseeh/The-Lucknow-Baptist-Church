import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { getApiUrl } from '../utils/api';
import SEO from '../components/SEO';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState({ blogs: [], sermons: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults({ blogs: [], sermons: [] });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(getApiUrl(`/api/search?q=${encodeURIComponent(query)}`));
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const totalResults = results.blogs.length + results.sermons.length;

  return (
    <>
      <SEO title={`Search Results: ${query}`} description={`Search results for "${query}" on Lucknow Baptist Church`} />
      <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--beige-bg)' }}>
        
        {/* Search Header */}
        <div style={{ background: 'white', padding: '40px 0', marginBottom: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--primary-color)', textAlign: 'center' }}>
              Search Results
            </h1>
            <SearchBar />
            {query && (
              <p style={{ textAlign: 'center', marginTop: '15px', color: '#666', fontSize: '0.95rem' }}>
                {loading ? 'Searching...' : `Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`}
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="container" style={{ maxWidth: '900px', paddingBottom: '60px' }}>
          
          {!query ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
              <p style={{ fontSize: '1.1rem' }}>Enter a search term to find blogs and sermons</p>
            </div>
          ) : loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
              <p>Searching...</p>
            </div>
          ) : totalResults === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>No results found for "{query}"</p>
              <p style={{ fontSize: '0.9rem' }}>Try different keywords or check your spelling</p>
            </div>
          ) : (
            <>
              {/* Blog Results */}
              {results.blogs.length > 0 && (
                <div style={{ marginBottom: '50px' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '25px', color: 'var(--primary-color)', borderBottom: '2px solid var(--gold-color)', paddingBottom: '10px' }}>
                    Blog Posts ({results.blogs.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {results.blogs.map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog.slug}`}
                        style={{
                          textDecoration: 'none',
                          background: 'white',
                          padding: '25px',
                          borderRadius: '12px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                          transition: 'all 0.3s',
                          display: 'block'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', gap: '20px' }}>
                          {blog.image && (
                            <div style={{ 
                              width: '120px', 
                              height: '120px', 
                              flexShrink: 0,
                              background: `url(${blog.image}) center/cover no-repeat`,
                              borderRadius: '8px'
                            }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary-color)' }}>
                              {blog.title}
                            </h3>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#888', marginBottom: '10px' }}>
                              <span>📅 {blog.date}</span>
                              <span>✍️ {blog.author}</span>
                              {blog.readTime > 0 && <span>⏱️ {blog.readTime} min read</span>}
                            </div>
                            {blog.tags && blog.tags.length > 0 && (
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {blog.tags.map((tag, idx) => (
                                  <span 
                                    key={idx}
                                    style={{
                                      background: '#f0f0f0',
                                      color: '#666',
                                      padding: '3px 8px',
                                      borderRadius: '10px',
                                      fontSize: '0.75rem',
                                      textTransform: 'capitalize'
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Sermon Results */}
              {results.sermons.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '25px', color: 'var(--primary-color)', borderBottom: '2px solid var(--gold-color)', paddingBottom: '10px' }}>
                    Sermons ({results.sermons.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {results.sermons.map((sermon) => (
                      <div
                        key={sermon._id}
                        style={{
                          background: 'white',
                          padding: '25px',
                          borderRadius: '12px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'}
                      >
                        <div style={{ display: 'flex', gap: '20px' }}>
                          {sermon.img && (
                            <div style={{ 
                              width: '120px', 
                              height: '120px', 
                              flexShrink: 0,
                              background: `url(${sermon.img}) center/cover no-repeat`,
                              borderRadius: '8px'
                            }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary-color)' }}>
                              {sermon.title}
                            </h3>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#888', marginBottom: '10px' }}>
                              <span>📅 {sermon.date}</span>
                              <span>🎤 {sermon.speaker}</span>
                              {sermon.series && <span>📚 {sermon.series}</span>}
                            </div>
                            {sermon.tags && sermon.tags.length > 0 && (
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {sermon.tags.map((tag, idx) => (
                                  <span 
                                    key={idx}
                                    style={{
                                      background: '#f0f0f0',
                                      color: '#666',
                                      padding: '3px 8px',
                                      borderRadius: '10px',
                                      fontSize: '0.75rem',
                                      textTransform: 'capitalize'
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
