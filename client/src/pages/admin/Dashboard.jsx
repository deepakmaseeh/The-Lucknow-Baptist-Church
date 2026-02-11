import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';
import AdminContentList from '../../components/admin/AdminContentList';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [sermons, setSermons] = useState([]);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      };

      const blogRes = await fetch(getApiUrl('/api/blogs/admin'), config);
      const sermonRes = await fetch(getApiUrl('/api/sermons/admin'), config);
      
      const blogData = await blogRes.json();
      const sermonData = await sermonRes.json();

      setBlogs(Array.isArray(blogData) ? blogData : []);
      setSermons(Array.isArray(sermonData) ? sermonData : []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditBlog = (id) => navigate(`/admin/blogs/edit/${id}`);
  const handleEditSermon = (id) => navigate(`/admin/sermons/edit/${id}`);

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(getApiUrl(`/api/${type}s/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        alert("Item deleted successfully");
        fetchData();
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting item");
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 style={{ marginBottom: '10px', color: '#333' }}>Dashboard</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}>Welcome back, {user?.username}!</p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '40px' }}>
            {/* Blog Stats */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Blog Posts</h3>
                        <p style={{ fontSize: '3rem', fontWeight: '800', color: '#333', margin: '10px 0 0', lineHeight: 1 }}>{blogs.length}</p>
                    </div>
                    <div style={{ background: '#e0f7fa', padding: '15px', borderRadius: '12px', color: '#006064', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.8rem' }}>📝</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button onClick={() => navigate('/admin/blogs/new')} className="btn-gold" style={{ flex: 1, fontSize: '0.9rem', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>+ Create New</button>
                    {/* Placeholder for future specific 'View All' page if distinct from dashboard */}
                </div>
            </div>

            {/* Sermon Stats */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Sermons</h3>
                        <p style={{ fontSize: '3rem', fontWeight: '800', color: '#333', margin: '10px 0 0', lineHeight: 1 }}>{sermons.length}</p>
                    </div>
                    <div style={{ background: '#fff8e1', padding: '15px', borderRadius: '12px', color: '#ff8f00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.8rem' }}>🎥</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                     <button onClick={() => navigate('/admin/sermons/new')} className="btn-gold" style={{ flex: 1, fontSize: '0.9rem', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>+ Upload Sermon</button>
                </div>
            </div>
        </div>

        <AdminContentList 
          title="Recent Blog Posts" 
          items={blogs.slice(0, 5)} 
          type="blog"
          onEdit={handleEditBlog}
          onDelete={(id) => handleDelete('blog', id)}
        />

        <AdminContentList 
          title="Recent Sermons" 
          items={sermons.slice(0, 5)} 
          type="sermon"
          onEdit={handleEditSermon}
          onDelete={(id) => handleDelete('sermon', id)}
        />

      </div>
    </div>
  );
}

export default Dashboard;
