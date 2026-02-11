import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';

function ManageSermons() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    series: '',
    speaker: '',
    date: '',
    videoUrl: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { user } = useAuth(); // Get user token

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
        alert("You are not logged in!");
        return;
    }

    try {
        const response = await fetch(getApiUrl('/api/sermons'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Sermon added successfully!");
            navigate('/admin/dashboard');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error creating sermon:", error);
        alert("Failed to add sermon");
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--light-bg)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Add New Sermon</h1>
          <button onClick={() => navigate('/admin/dashboard')} className="btn-outline-dark">Cancel</button>
        </div>

        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Sermon Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. Walking in Faith" 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Series</label>
                <input 
                    type="text" 
                    name="series" 
                    value={formData.series} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="e.g. The Book of James" 
                    required 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                </div>

                <div className="form-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Speaker</label>
                <input 
                    type="text" 
                    name="speaker" 
                    value={formData.speaker} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="e.g. Pastor John Doe" 
                    required 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                </div>
            </div>

            <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Date Preached</label>
               <input 
                 type="date" 
                 name="date" 
                 value={formData.date} 
                 onChange={handleChange} 
                 className="form-input" 
                 required 
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
               />
            </div>

             <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Video URL (YouTube/Vimeo)</label>
               <input 
                 type="url" 
                 name="videoUrl" 
                 value={formData.videoUrl} 
                 onChange={handleChange} 
                 className="form-input" 
                 placeholder="https://youtube.com/watch?v=..." 
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
               />
            </div>

            <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Thumbnail Image URL</label>
               <input 
                 type="url" 
                 name="imageUrl" 
                 value={formData.imageUrl} 
                 onChange={handleChange} 
                 className="form-input" 
                 placeholder="https://example.com/image.jpg" 
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
               />
            </div>

            <button type="submit" className="btn-gold" style={{ marginTop: '20px' }}>Upload Sermon</button>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageSermons;
