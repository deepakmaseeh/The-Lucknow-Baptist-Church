import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSiteConfig } from '../../context/SiteConfigContext';

function Appearance() {
  const { user } = useAuth();
  const { config, refreshConfig } = useSiteConfig();
  
  const [formData, setFormData] = useState({
    siteName: '',
    tagline: '',
    theme: {
      primaryColor: '#D4AF37',
      secondaryColor: '#111111',
      backgroundColor: '#f4f1ea',
      fontHeading: 'Playfair Display',
      fontBody: 'Roboto'
    }
  });

  const [saving, setSaving] = useState(false);

  // Load initial config into form
  useEffect(() => {
    if (config) {
      setFormData({
        siteName: config.siteName,
        tagline: config.tagline,
        theme: { ...config.theme }
      });
    }
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [child]: value
            }
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
        const response = await fetch('/api/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Appearance settings updated!");
            await refreshConfig(); // Instantly update the site visual
        } else {
            alert("Failed to update settings.");
        }
    } catch (error) {
        console.error(error);
        alert("Error saving settings.");
    } finally {
        setSaving(false);
    }
  };

  const uploadFileHandler = async (e, field) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setSaving(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      
      // Update form state with the returned path
      setFormData(prev => ({ ...prev, [field]: data }));
      setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
      alert('File upload failed!');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px', fontFamily: 'var(--font-heading)' }}>Site Appearance</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* Identity Section */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Identity</h3>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Site Name</label>
                <input 
                    type="text" 
                    name="siteName" 
                    value={formData.siteName} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Tagline</label>
                <input 
                    type="text" 
                    name="tagline" 
                    value={formData.tagline} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
            </div>

             {/* Logo Upload */}
             <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Logo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   {formData.logoUrl && <img src={formData.logoUrl} alt="Logo Preview" style={{ height: '50px' }} />}
                   <input type="text" name="logoUrl" value={formData.logoUrl} readOnly style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                </div>
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={(e) => uploadFileHandler(e, 'logoUrl')}
                    style={{ marginTop: '10px' }}
                />
            </div>

             {/* Favicon Upload */}
             <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Favicon</label>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   {formData.faviconUrl && <img src={formData.faviconUrl} alt="Favicon Preview" style={{ height: '32px' }} />}
                   <input type="text" name="faviconUrl" value={formData.faviconUrl} readOnly style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                </div>
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={(e) => uploadFileHandler(e, 'faviconUrl')}
                    style={{ marginTop: '10px' }}
                />
            </div>
        </div>

        {/* Colors Section */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Theme Colors</h3>
            
            {/* Live Preview of Changes happens automatically because we aren't updating context yet until save, 
                but we could make a "preview" mode later. For now, simple inputs. */}
            
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input 
                    type="color" 
                    name="theme.primaryColor" 
                    value={formData.theme.primaryColor} 
                    onChange={handleChange}
                    style={{ width: '50px', height: '50px', border: 'none', cursor: 'pointer' }}
                />
                <div>
                    <label style={{ fontWeight: 'bold', display: 'block' }}>Primary Accent (Gold)</label>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Buttons, Highlights, Links</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input 
                    type="color" 
                    name="theme.secondaryColor" 
                    value={formData.theme.secondaryColor} 
                    onChange={handleChange}
                    style={{ width: '50px', height: '50px', border: 'none', cursor: 'pointer' }}
                />
                <div>
                    <label style={{ fontWeight: 'bold', display: 'block' }}>Secondary (Dark/Text)</label>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Headings, Footer, Dark Backgrounds</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input 
                    type="color" 
                    name="theme.backgroundColor" 
                    value={formData.theme.backgroundColor} 
                    onChange={handleChange}
                    style={{ width: '50px', height: '50px', border: 'none', cursor: 'pointer' }}
                />
                <div>
                    <label style={{ fontWeight: 'bold', display: 'block' }}>Background Color</label>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Main page background (usually light/beige)</span>
                </div>
            </div>
        </div>

        {/* Typography Section */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', gridColumn: 'span 2' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Typography</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Heading Font</label>
                    <select 
                        name="theme.fontHeading" 
                        value={formData.theme.fontHeading} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                    >
                        <option value="Playfair Display">Playfair Display (Classy Serif)</option>
                        <option value="Montserrat">Montserrat (Modern Sans)</option>
                        <option value="Roboto">Roboto (Clean Sans)</option>
                        <option value="RamadhanMubarok">Ramadhan Mubarok (Custom)</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Body Font</label>
                    <select 
                        name="theme.fontBody" 
                        value={formData.theme.fontBody} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                    >
                        <option value="Roboto">Roboto (Clean)</option>
                        <option value="Open Sans">Open Sans (Friendly)</option>
                        <option value="Lato">Lato (Balanced)</option>
                        <option value="Inter">Inter (UI Optimized)</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Save Button */}
        <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
            <button 
                type="submit" 
                className="btn-gold" 
                disabled={saving}
                style={{ padding: '15px 40px', fontSize: '1.1rem', cursor: saving ? 'not-allowed' : 'pointer' }}
            >
                {saving ? 'Applying Changes...' : 'Save & Publish Changes'}
            </button>
        </div>

      </form>
    </div>
  );
}

export default Appearance;
