import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../../utils/api';

function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(getApiUrl('/api/analytics/dashboard'), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading analytics...</div>;
  }

  if (!stats || stats.totalViews === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px' }}>📊 No Analytics Data Yet</h2>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Analytics tracking is set up and ready! Data will appear here once visitors view your content.
        </p>
        <div style={{ 
          background: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'left',
          marginTop: '30px'
        }}>
          <h3 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>To generate analytics data:</h3>
          <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Visit your public blog pages (not in admin)</li>
            <li>Click on individual blog posts</li>
            <li>View sermons</li>
            <li>Come back here to see the stats!</li>
          </ol>
          <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#999' }}>
            💡 Tip: Open an incognito window and browse your site to generate test data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>📊 Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '30px',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '10px' }}>Total Views (30 days)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{(stats.totalViews || 0).toLocaleString()}</div>
        </div>

        {stats.deviceStats && stats.deviceStats.map(device => (
          <div key={device._id} style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
              {device._id.charAt(0).toUpperCase() + device._id.slice(1)} Views
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
              {device.count.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Top Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        {/* Top Blogs */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>📝 Top Blog Posts</h2>
          {stats.topBlogs && stats.topBlogs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {stats.topBlogs.map((item, index) => (
                <div key={item._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}`
                }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {item.blog?.title || 'Unknown'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {item.blog?.slug}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--gold-color)'
                  }}>
                    {item.views}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999' }}>No blog data available</p>
          )}
        </div>

        {/* Top Sermons */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>🎥 Top Sermons</h2>
          {stats.topSermons && stats.topSermons.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {stats.topSermons.map((item, index) => (
                <div key={item._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}`
                }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {item.sermon?.title || 'Unknown'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {item.sermon?.speaker}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--gold-color)'
                  }}>
                    {item.views}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999' }}>No sermon data available</p>
          )}
        </div>
      </div>

      {/* Views Over Time Chart */}
      {stats.viewsPerDay && stats.viewsPerDay.length > 0 && (
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>📈 Views Over Time (Last 30 Days)</h2>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '4px',
            height: '200px',
            padding: '20px 0'
          }}>
            {stats.viewsPerDay.map((day) => {
              const maxViews = Math.max(...stats.viewsPerDay.map(d => d.count));
              const height = (day.count / maxViews) * 100;
              return (
                <div
                  key={day._id}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(to top, var(--gold-color), #f9d77e)',
                    height: `${height}%`,
                    minHeight: '5px',
                    borderRadius: '4px 4px 0 0',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  title={`${day._id}: ${day.count} views`}
                />
              );
            })}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#999',
            marginTop: '10px'
          }}>
            <span>{stats.viewsPerDay[0]?._id}</span>
            <span>{stats.viewsPerDay[stats.viewsPerDay.length - 1]?._id}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
