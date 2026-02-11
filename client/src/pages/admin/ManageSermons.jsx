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
          <h1>{editId ? 'Edit Sermon' : 'Add New Sermon'}</h1>
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
                <select 
                    name="seriesId" 
                    value={formData.seriesId} 
                    onChange={handleChange} 
                    className="form-input" 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                >
                    <option value="">No Series (Standalone)</option>
                    {allSeries.map((s) => (
                      <option key={s._id} value={s._id}>{s.title}</option>
                    ))}
                </select>
                <small style={{ color: '#888', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                  Select a series or leave as standalone. <a href="/admin/series" style={{ color: 'var(--gold-color)' }}>Manage Series</a>
                </small>
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
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Thumbnail Image</label>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="Image URL or Upload" 
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}
                    readOnly
                  />
                  {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" style={{ height: '50px', borderRadius: '4px', border: '1px solid #ddd' }} />}
               </div>
               
               <input 
                 type="file" 
                 id="image-file"
                 label="Choose File"
                 onChange={uploadFileHandler}
                 style={{ display: 'block', width: '100%' }}
               />
               {uploading && <span style={{ fontSize: '0.9rem', color: 'var(--gold-color)' }}>Uploading...</span>}
             </div>

            <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Tags</label>
               <TagInput 
                 tags={formData.tags} 
                 onChange={(newTags) => setFormData({ ...formData, tags: newTags })}
               />
               <small style={{ color: '#888', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                 Press Enter to add tags. Use tags like "worship", "teaching", "testimony", etc.
               </small>
            </div>

            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <label htmlFor="isPublished" style={{ color: '#333', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Visible to Public (Publish)
                </label>
                <span style={{ fontSize: '0.85rem', color: '#666', marginLeft: '10px' }}>
                    {formData.isPublished ? '(Will appear on sermons page)' : '(Hidden from visitors)'}
                </span>
            </div>

            <button type="submit" className="btn-gold" style={{ marginTop: '20px' }}>{editId ? 'Update Sermon' : 'Upload Sermon'}</button>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageSermons;
