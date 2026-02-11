import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../../utils/api';

function PodcastSettings() {
  const [config, setConfig] = useState({
    title: '',
    description: '',
    author: '',
    email: '',
    category: 'Religion & Spirituality',
    subcategory: 'Christianity',
    language: 'en-us',
    copyright: '',
    imageUrl: '',
    explicit: false,
    websiteUrl: '',
    itunesUrl: '',
    spotifyUrl: '',
    ownerName: '',
    ownerEmail: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch(getApiUrl('/api/podcast/config'), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error fetching podcast config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setConfig({
      ...config,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(getApiUrl('/api/podcast/config'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        alert('Podcast settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const feedUrl = `${window.location.origin}/api/podcast/feed.xml`;

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '10px' }}>🎙️ Podcast Settings</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Configure your podcast RSS feed for iTunes, Spotify, and other podcast platforms.
      </p>

      {/* Feed URL Display */}
      <div style={{
        background: '#f0f8ff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ marginBottom: '10px' }}>📡 Your Podcast Feed URL</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={feedUrl}
            readOnly
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              background: 'white',
              fontFamily: 'monospace'
            }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(feedUrl);
              alert('Feed URL copied to clipboard!');
            }}
            style={{
              padding: '10px 20px',
              background: 'var(--gold-color)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Copy
          </button>
          <a
            href={feedUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              background: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            View Feed
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Basic Information</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Podcast Title *
          </label>
          <input
            type="text"
            name="title"
            value={config.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={config.description}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={config.author}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={config.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>

        <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>iTunes Settings</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Category
            </label>
            <select
              name="category"
              value={config.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}
            >
              <option value="Religion & Spirituality">Religion & Spirituality</option>
              <option value="Education">Education</option>
              <option value="Society & Culture">Society & Culture</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Subcategory
            </label>
            <input
              type="text"
              name="subcategory"
              value={config.subcategory}
              onChange={handleChange}
              placeholder="e.g., Christianity"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Podcast Image URL * (1400x1400 minimum)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={config.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://example.com/podcast-image.jpg"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}
          />
          {config.imageUrl && (
            <img
              src={config.imageUrl}
              alt="Podcast cover"
              style={{
                marginTop: '10px',
                maxWidth: '200px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              name="explicit"
              checked={config.explicit}
              onChange={handleChange}
            />
            <span style={{ fontWeight: 'bold' }}>Explicit Content</span>
          </label>
        </div>

        <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Platform Links</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            iTunes URL
          </label>
          <input
            type="url"
            name="itunesUrl"
            value={config.itunesUrl}
            onChange={handleChange}
            placeholder="https://podcasts.apple.com/..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Spotify URL
          </label>
          <input
            type="url"
            name="spotifyUrl"
            value={config.spotifyUrl}
            onChange={handleChange}
            placeholder="https://open.spotify.com/show/..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            width: '100%',
            padding: '15px',
            background: 'var(--gold-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: saving ? 'not-allowed' : 'pointer',
            marginTop: '30px'
          }}
        >
          {saving ? 'Saving...' : 'Save Podcast Settings'}
        </button>
      </form>
    </div>
  );
}

export default PodcastSettings;
