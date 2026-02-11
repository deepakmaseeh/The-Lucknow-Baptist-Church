import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';

function ManageBlogs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.token) {
      alert("You are not logged in!");
      return;
    }

    try {
      const response = await fetch(getApiUrl('/api/blogs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Blog post created successfully!");
        navigate('/admin/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog post");
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--light-bg)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Create New Blog Post</h1>
          <button onClick={() => navigate('/admin/dashboard')} className="btn-outline-dark">Cancel</button>
        </div>

        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="Enter post title" 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Author</label>
               <input 
                 type="text" 
                 name="author" 
                 value={formData.author} 
                 onChange={handleChange} 
                 className="form-input" 
                 placeholder="Author Name" 
                 required 
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
               />
            </div>

            <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Image URL</label>
               <input 
                 type="url" 
                 name="image" 
                 value={formData.image} 
                 onChange={handleChange} 
                 className="form-input" 
                 placeholder="https://example.com/image.jpg" 
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
               />
            </div>

            <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Content</label>
               <textarea 
                 name="content" 
                 value={formData.content} 
                 onChange={handleChange} 
                 className="form-input" 
                 rows="10" 
                 placeholder="Write your article here..." 
                 required 
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit' }}
               ></textarea>
            </div>

            <button type="submit" className="btn-gold" style={{ marginTop: '20px' }}>Publish Post</button>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageBlogs;
