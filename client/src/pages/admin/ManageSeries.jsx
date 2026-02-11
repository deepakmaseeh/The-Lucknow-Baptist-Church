import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';

function ManageSeries() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editId = id;
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    startDate: '',
    endDate: ''
  });

  const [allSeries, setAllSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSeries();
    if (editId) {
      fetchSeries();
    }
  }, [editId]);

  const fetchAllSeries = async () => {
    try {
      const response = await fetch(getApiUrl('/api/series'));
      const data = await response.json();
      setAllSeries(data);
    } catch (error) {
      console.error('Error fetching series:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeries = async () => {
    try {
      const response = await fetch(getApiUrl(`/api/series/${editId}`));
      const data = await response.json();
      setFormData({
        title: data.title,
        description: data.description || '',
        image: data.image || '',
        startDate: data.startDate ? data.startDate.split('T')[0] : '',
        endDate: data.endDate ? data.endDate.split('T')[0] : ''
      });
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      alert('You are not logged in!');
      return;
    }

    try {
      const url = editId ? `/api/series/${editId}` : '/api/series';
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
        alert(editId ? 'Series updated!' : 'Series created!');
        navigate('/admin/series');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving series:', error);
      alert('Failed to save series');
    }
  };

  const handleDelete = async (seriesId) => {
    if (!window.confirm('Are you sure you want to delete this series?')) return;

    try {
      const response = await fetch(getApiUrl(`/api/series/${seriesId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        alert('Series deleted successfully');
        fetchAllSeries();
      } else {
        alert('Failed to delete series');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting series');
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>{editId ? 'Edit Series' : 'Manage Series'}</h1>
          <button onClick={() => navigate('/admin/dashboard')} className="btn-outline-dark">Back to Dashboard</button>
        </div>

        {/* Create/Edit Form */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>{editId ? 'Edit Series' : 'Create New Series'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Series Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. The Book of James" 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Brief description of the series..." 
                rows="4"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" className="btn-gold" style={{ flex: 1 }}>
                {editId ? 'Update Series' : 'Create Series'}
              </button>
              {editId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setFormData({ title: '', description: '', image: '', startDate: '', endDate: '' });
                    navigate('/admin/series');
                  }}
                  className="btn-outline-dark"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Series List */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>All Series</h2>
          
          {loading ? (
            <p style={{ textAlign: 'center', color: '#888' }}>Loading...</p>
          ) : allSeries.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>No series created yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {allSeries.map((series) => (
                <div 
                  key={series._id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#333' }}>{series.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                      {series.description || 'No description'}
                    </p>
                    {series.startDate && (
                      <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#888' }}>
                        {new Date(series.startDate).toLocaleDateString()} 
                        {series.endDate && ` - ${new Date(series.endDate).toLocaleDateString()}`}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => navigate(`/admin/series/edit/${series._id}`)}
                      className="btn-outline-dark"
                      style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(series._id)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        background: '#fff0f0',
                        border: '1px solid #ffcccc',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#d32f2f'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageSeries;
