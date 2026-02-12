import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';
import TagInput from '../../components/TagInput';
import RevisionHistory from '../../components/admin/RevisionHistory';
import WorkflowStatus from '../../components/admin/WorkflowStatus';
import WorkflowActions from '../../components/admin/WorkflowActions';

function ManageBlogs() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editId = id;
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    content: '',
    isPublished: true,
    tags: [],
    publishDate: ''
  });
  const [scheduleForLater, setScheduleForLater] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [workflowState, setWorkflowState] = useState('draft');
  const { user } = useAuth();

  useEffect(() => {
    if (editId) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(getApiUrl(`/api/blogs/${editId}`));
          const data = await response.json();
          setFormData({
            title: data.title,
            author: data.author,
            image: data.image,
            content: data.content,
            isPublished: data.isPublished,
            tags: data.tags || [],
            publishDate: data.publishDate ? new Date(data.publishDate).toISOString().slice(0, 16) : ''
          });
          setWorkflowState(data.workflowState || 'draft');
          if (data.publishDate && new Date(data.publishDate) > new Date()) {
            setScheduleForLater(true);
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };
      fetchBlog();
    }
  }, [editId]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };



  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.token) {
      alert("You are not logged in!");
      return;
    }

    try {
      const url = editId ? `/api/blogs/${editId}` : '/api/blogs';
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
        alert(editId ? "Blog post updated!" : "Blog post created!");
        navigate('/admin/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post");
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

      setFormData(prev => ({ ...prev, image: data }));
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
          {editId ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h2>
        <button onClick={() => navigate('/admin/dashboard')} className="btn-outline-dark">Cancel</button>
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '40px' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Tags</label>
               <div style={{ background: 'rgba(255,255,255,0.5)', padding: '4px', borderRadius: '8px' }}>
                 <TagInput tags={formData.tags} setTags={(newTags) => setFormData({ ...formData, tags: newTags })} />
               </div>
            </div>

             <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Content</label>
              <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={handleContentChange} 
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
             <div className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.5)' }}>
               <h4 style={{ marginTop: 0, marginBottom: '16px' }}>Publishing</h4>
               <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  id="published-check-blog"
                  style={{ width: '20px', height: '20px', accentColor: 'var(--gold-color)' }}
                />
                <label htmlFor="published-check-blog" style={{ fontSize: '1rem', fontWeight: '500' }}>Publish Immediately</label>
              </div>

               <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                   <input 
                      type="checkbox" 
                      id="schedule-check-blog"
                      checked={scheduleForLater} 
                      onChange={(e) => setScheduleForLater(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--gold-color)' }}
                   />
                   <label htmlFor="schedule-check-blog" style={{ fontSize: '0.9rem' }}>Schedule for later</label>
                </div>
                {scheduleForLater && (
                  <input
                    type="datetime-local"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleChange}
                     style={{ 
                      width: '100%', 
                      padding: '10px', 
                      borderRadius: '6px', 
                      border: '1px solid #ddd', 
                      fontSize: '0.9rem'
                    }}
                  />
                )}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.5)' }}>
                <h4 style={{ marginTop: 0, marginBottom: '16px' }}>Featured Image</h4>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      borderRadius: '6px', 
                      border: '1px solid #ddd', 
                      fontSize: '0.9rem',
                      background: 'white'
                    }}
                    readOnly
                  />
                </div>
                {formData.image && (
                    <img src={formData.image} alt="Preview" style={{ width: '100%', borderRadius: '8px', height: '150px', objectFit: 'cover' }} />
                )}
                 <input 
                 type="file" 
                 id="image-file"
                 onChange={uploadFileHandler}
                 style={{ display: 'block', width: '100%', fontSize: '0.9rem', marginTop: '10px' }}
               />
                {uploading && <span style={{ fontSize: '0.9rem', color: 'var(--gold-color)' }}>Uploading...</span>}
            </div>

             {/* Workflow Actions */}
            {editId && (
               <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.5)' }}>
                  <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Workflow</h4>
                  <WorkflowStatus currentState={workflowState} />
                  <div style={{ marginTop: '15px' }}>
                    <WorkflowActions 
                      documentId={editId} 
                      type="blog" 
                      currentState={workflowState} 
                      onUpdate={(newState) => setWorkflowState(newState)} 
                    />
                  </div>
               </div>
            )}
             {editId && showHistory && (
                 <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.5)', marginTop: '20px' }}>
                    <h4 style={{marginTop:0}}>Revision History</h4>
                    <RevisionHistory 
                      contentType="blog" 
                      contentId={editId}
                      onRestore={() => window.location.reload()}
                    />
                 </div>
             )}

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '14px', fontSize: '1.1rem', marginTop: '10px' }}>
              {editId ? 'Update Blog Post' : 'Create Blog Post'}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default ManageBlogs;
