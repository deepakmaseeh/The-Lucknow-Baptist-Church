import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';
import TagInput from '../../components/TagInput';

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
          <h1>{editId ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
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
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Featured Image</label>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="Image URL or Upload" 
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}
                    readOnly
                  />
                  {formData.image && <img src={formData.image} alt="Preview" style={{ height: '50px', borderRadius: '4px', border: '1px solid #ddd' }} />}
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
                 Press Enter to add tags. Use tags like "devotional", "prayer", "testimony", etc.
               </small>
            </div>

            <div className="form-group">
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Content</label>
               <div style={{ background: 'white' }}>
                 <ReactQuill 
                   theme="snow" 
                   value={formData.content} 
                   onChange={handleContentChange} 
                   style={{ height: '300px', marginBottom: '50px' }} 
                 />
               </div>
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
                    {formData.isPublished ? '(Will appear on blog page)' : '(Hidden from visitors)'}
                </span>
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
                {editId ? 'Update Post' : 'Create Post'}
            </button>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageBlogs;
