import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';
import TagInput from '../../components/TagInput';
import RevisionHistory from '../../components/admin/RevisionHistory';

function ManageSermons() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editId = id;

  const [formData, setFormData] = useState({
    title: '',
    series: '',
    seriesId: '',
    speaker: '',
    date: '',
    videoUrl: '',
    imageUrl: '',
    isPublished: true,
    tags: [],
    publishDate: ''
  });
  const [uploading, setUploading] = useState(false);
  const [allSeries, setAllSeries] = useState([]);
  const [scheduleForLater, setScheduleForLater] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch all series for dropdown
    const fetchSeries = async () => {
      try {
        const response = await fetch(getApiUrl('/api/series'));
        const data = await response.json();
        setAllSeries(data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };
    fetchSeries();

    if (editId) {
      const fetchSermon = async () => {
        try {
          const response = await fetch(getApiUrl(`/api/sermons/${editId}`));
          const data = await response.json();
          // Map DB 'img' to frontend 'imageUrl'
          setFormData({
            title: data.title,
            series: data.series || '',
            seriesId: data.seriesId || '',
            speaker: data.speaker,
            date: data.date,
            videoUrl: data.videoUrl,
            imageUrl: data.img,
            isPublished: data.isPublished,
            tags: data.tags || [],
            publishDate: data.publishDate ? new Date(data.publishDate).toISOString().slice(0, 16) : ''
          });
          if (data.publishDate && new Date(data.publishDate) > new Date()) {
            setScheduleForLater(true);
          }
        } catch (error) {
          console.error("Error fetching sermon:", error);
        }
      };
      fetchSermon();
    }
  }, [editId]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
        alert("You are not logged in!");
        return;
    }

    try {
        const url = editId ? `/api/sermons/${editId}` : '/api/sermons';
        const method = editId ? 'PUT' : 'POST';

        const response = await fetch(getApiUrl(url), {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert(editId ? "Sermon updated successfully!" : "Sermon added successfully!");
            navigate('/admin/dashboard');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error saving sermon:", error);
        alert("Failed to save sermon");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(getApiUrl('/api/upload'), formData, config);

      setFormData(prev => ({ ...prev, imageUrl: data }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('File upload failed!');
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', margin: 0, color: '#1a1a1a', fontWeight: '800' }}>
          {editId ? 'Edit Sermon' : 'Add New Sermon'}
        </h2>
        <button onClick={() => navigate('/admin/dashboard')} className="btn-outline-dark">Cancel</button>
      </div>
      
      <div className="glass-panel" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '40px' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Sermon Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Walking in Faith"
                required
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.8)'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Series</label>
                <select
                  name="seriesId"
                  value={formData.seriesId}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid #ddd', 
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.8)'
                  }}
                >
                  <option value="">No Series (Standalone)</option>
                  {allSeries.map((s) => (
                    <option key={s._id} value={s._id}>{s.title}</option>
                  ))}
                </select>
                <small style={{ color: '#888', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                   Select a series or leave as standalone.
                </small>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Speaker</label>
                <input
                  type="text"
                  name="speaker"
                  value={formData.speaker}
                  onChange={handleChange}
                  placeholder="e.g. Pastor John Doe"
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid #ddd', 
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.8)'
                  }}
                />
              </div>
            </div>

             <div className="form-group">
               <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Date Preached</label>
               <input
                 type="date"
                 name="date"
                 value={formData.date}
                 onChange={handleChange}
                 required
                 style={{ 
                   width: '100%', 
                   padding: '12px 16px', 
                   borderRadius: '8px', 
                   border: '1px solid #ddd', 
                   fontSize: '1rem',
                   background: 'rgba(255,255,255,0.8)'
                 }}
               />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Video URL (YouTube/Vimeo)</label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.8)'
                }}
              />
            </div>
            
             <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Tags</label>
               <div style={{ background: 'rgba(255,255,255,0.5)', padding: '4px', borderRadius: '8px' }}>
                 <TagInput tags={formData.tags} setTags={(newTags) => setFormData({ ...formData, tags: newTags })} />
               </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
             <div className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.5)' }}>
               <h4 style={{ marginTop: 0, marginBottom: '16px' }}>Publishing</h4>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--gold-color)' }}
                />
                <label htmlFor="isPublished" style={{ fontSize: '1rem', fontWeight: '500' }}>
                    Publish Immediately
                </label>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                  {formData.isPublished ? 'Visible to public' : 'Hidden draft'}
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.5)' }}>
               <h4 style={{ marginTop: 0, marginBottom: '16px' }}>Thumbnail Image</h4>
               <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                    style={{ 
                      flex: 1, 
                      padding: '10px', 
                      borderRadius: '6px', 
                      border: '1px solid #ddd', 
                      fontSize: '0.9rem',
                      background: 'white'
                    }}
                  />
               </div>
                
               <input 
                 type="file" 
                 id="image-file"
                 onChange={uploadFileHandler}
                 style={{ display: 'block', width: '100%', fontSize: '0.9rem' }}
               />
               
               {formData.imageUrl && (
                   <img src={formData.imageUrl} alt="Preview" style={{ marginTop: '10px', width: '100%', borderRadius: '8px', height: '150px', objectFit: 'cover' }} />
               )}
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '14px', fontSize: '1.1rem', marginTop: '10px' }}>
              {editId ? 'Update Sermon' : 'Create Sermon'}
            </button>
            
             {editId && (
                <div style={{ marginTop: '20px' }}>
                    <RevisionHistory documentId={editId} type="sermon" />
                </div>
            )}
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default ManageSermons;
