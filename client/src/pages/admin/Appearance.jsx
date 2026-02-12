import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { getApiUrl } from '../../utils/api';

function Appearance() {
  const { user } = useAuth();
  const { config, refreshConfig } = useSiteConfig();
  
  const [activeTab, setActiveTab] = useState('identity');
  const [formData, setFormData] = useState({
    siteName: '',
    tagline: '',
    logoUrl: '',
    faviconUrl: '',
    theme: {
      primaryColor: '#D4AF37',
      secondaryColor: '#111111',
      backgroundColor: '#f4f1ea',
      accentColor: '#C9A532',
      textColor: '#333333',
      linkColor: '#D4AF37',
      linkHoverColor: '#C9A532',
      successColor: '#28a745',
      errorColor: '#dc3545',
      warningColor: '#ffc107',
      borderColor: '#e0e0e0',
      cardBackground: '#ffffff',
      headerBackground: '#ffffff',
      footerBackground: '#1a1a1a',
      footerTextColor: '#ffffff',
      fontHeading: 'Playfair Display',
      fontBody: 'Roboto',
      baseFontSize: '16px',
      lineHeight: '1.6',
      letterSpacing: 'normal',
      headingWeight: '700',
      bodyWeight: '400',
      containerMaxWidth: '1200px',
      sectionPadding: '80px',
      elementSpacing: '20px',
      borderRadius: '8px',
      cardShadow: '0 2px 8px rgba(0,0,0,0.1)',
      headerStyle: 'solid',
      headerHeight: '80px',
      logoPosition: 'left',
      logoSize: '120px',
      footerLayout: '3-column',
      footerPadding: '60px',
      buttonBorderRadius: '6px',
      buttonPadding: '12px 24px',
      buttonFontSize: '16px',
      buttonFontWeight: '600',
      buttonHoverEffect: 'lift',
      customCSS: '',
      darkModeEnabled: false,
      animationsEnabled: true,
      scrollBehavior: 'smooth'
    },
    contact: {
      address: '',
      phone: '',
      email: ''
    },
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: ''
    }
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (config) {
      setFormData({
        siteName: config.siteName || '',
        tagline: config.tagline || '',
        logoUrl: config.logoUrl || '',
        faviconUrl: config.faviconUrl || '',
        theme: { ...formData.theme, ...config.theme },
        contact: { ...formData.contact, ...config.contact },
        socialMedia: { ...formData.socialMedia, ...config.socialMedia }
      });
    }
  }, [config]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: finalValue
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: finalValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch(getApiUrl('/api/settings'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Appearance settings updated!");
        await refreshConfig();
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
    const uploadData = new FormData();
    uploadData.append('image', file);
    setSaving(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(getApiUrl('/api/upload'), uploadData, config);
      setFormData(prev => ({ ...prev, [field]: data }));
      setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
      alert('File upload failed!');
    }
  };

  const tabs = [
    { id: 'identity', label: 'Identity', icon: '🏛️' },
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'typography', label: 'Typography', icon: '✍️' },
    { id: 'spacing', label: 'Layout', icon: '📐' },
    { id: 'header', label: 'Header', icon: '🔝' },
    { id: 'footer', label: 'Footer', icon: '🔽' },
    { id: 'buttons', label: 'Buttons', icon: '🔘' },
    { id: 'social', label: 'Social', icon: '🌐' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' }
  ];

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px'
    },
    header: {
      marginBottom: '40px',
      paddingBottom: '20px',
      borderBottom: '1px solid #e5e7eb'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '8px',
      fontFamily: 'var(--font-heading)'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#6b7280',
      fontWeight: '400'
    },
    tabContainer: {
      display: 'flex',
      gap: '4px',
      marginBottom: '32px',
      borderBottom: '1px solid #e5e7eb',
      overflowX: 'auto',
      paddingBottom: '0'
    },
    tab: (isActive) => ({
      padding: '14px 24px',
      background: 'transparent',
      border: 'none',
      borderBottom: isActive ? '2px solid #D4AF37' : '2px solid transparent',
      cursor: 'pointer',
      fontSize: '0.9375rem',
      fontWeight: isActive ? '600' : '500',
      color: isActive ? '#D4AF37' : '#6b7280',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }),
    card: {
      background: '#ffffff',
      padding: '32px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: '1px solid #f3f4f6'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      fontSize: '0.875rem',
      color: '#374151',
      letterSpacing: '0.01em'
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '0.9375rem',
      transition: 'all 0.2s ease',
      outline: 'none',
      fontFamily: 'inherit'
    },
    select: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '0.9375rem',
      transition: 'all 0.2s ease',
      outline: 'none',
      background: 'white',
      cursor: 'pointer',
      fontFamily: 'inherit'
    },
    helpText: {
      fontSize: '0.8125rem',
      color: '#6b7280',
      marginTop: '6px',
      lineHeight: '1.4'
    },
    saveButton: {
      padding: '14px 32px',
      fontSize: '0.9375rem',
      fontWeight: '600',
      background: saving ? '#9ca3af' : 'linear-gradient(135deg, #D4AF37 0%, #C9A532 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: saving ? 'not-allowed' : 'pointer',
      boxShadow: saving ? 'none' : '0 4px 6px -1px rgba(212, 175, 55, 0.3), 0 2px 4px -1px rgba(212, 175, 55, 0.2)',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Site Appearance</h1>
        <p style={styles.subtitle}>Customize your website's visual identity and branding</p>
      </div>
      
      {/* Tabs */}
      <div style={styles.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={styles.tab(activeTab === tab.id)}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.color = '#6b7280';
              }
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Identity Tab */}
        {activeTab === 'identity' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Site Information</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Site Name</label>
                <input 
                  type="text" 
                  name="siteName" 
                  value={formData.siteName} 
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                <p style={styles.helpText}>The name of your website or organization</p>
              </div>
              
              <div>
                <label style={styles.label}>Tagline</label>
                <input 
                  type="text" 
                  name="tagline" 
                  value={formData.tagline} 
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                <p style={styles.helpText}>A short description or motto</p>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Brand Assets</h3>
              
              <div style={{ marginBottom: '28px' }}>
                <label style={styles.label}>Logo</label>
                {formData.logoUrl && (
                  <div style={{ 
                    marginBottom: '12px', 
                    padding: '20px', 
                    background: '#f9fafb', 
                    borderRadius: '8px', 
                    textAlign: 'center',
                    border: '1px dashed #d1d5db'
                  }}>
                    <img src={formData.logoUrl} alt="Logo Preview" style={{ maxHeight: '60px' }} />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  onChange={(e) => uploadFileHandler(e, 'logoUrl')}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '2px dashed #d1d5db', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                />
                <p style={styles.helpText}>Recommended: PNG or SVG, max 200px height</p>
              </div>

              <div>
                <label style={styles.label}>Favicon</label>
                {formData.faviconUrl && (
                  <div style={{ 
                    marginBottom: '12px', 
                    padding: '20px', 
                    background: '#f9fafb', 
                    borderRadius: '8px', 
                    textAlign: 'center',
                    border: '1px dashed #d1d5db'
                  }}>
                    <img src={formData.faviconUrl} alt="Favicon Preview" style={{ maxHeight: '32px' }} />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  onChange={(e) => uploadFileHandler(e, 'faviconUrl')}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '2px dashed #d1d5db', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                />
                <p style={styles.helpText}>Recommended: 32x32px or 64x64px</p>
              </div>
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <ColorSection title="Core Colors" colors={[
              { name: 'theme.primaryColor', label: 'Primary', desc: 'Main brand color for buttons and highlights' },
              { name: 'theme.secondaryColor', label: 'Secondary', desc: 'Supporting color for headings and accents' },
              { name: 'theme.backgroundColor', label: 'Background', desc: 'Main page background color' },
              { name: 'theme.accentColor', label: 'Accent', desc: 'Badges, notifications, and emphasis' }
            ]} formData={formData} handleChange={handleChange} />

            <ColorSection title="Text & Links" colors={[
              { name: 'theme.textColor', label: 'Text', desc: 'Primary body text color' },
              { name: 'theme.linkColor', label: 'Links', desc: 'Hyperlink color' },
              { name: 'theme.linkHoverColor', label: 'Link Hover', desc: 'Link color on hover' }
            ]} formData={formData} handleChange={handleChange} />

            <ColorSection title="Status Colors" colors={[
              { name: 'theme.successColor', label: 'Success', desc: 'Success messages and confirmations' },
              { name: 'theme.errorColor', label: 'Error', desc: 'Error messages and warnings' },
              { name: 'theme.warningColor', label: 'Warning', desc: 'Caution and alert messages' }
            ]} formData={formData} handleChange={handleChange} />

            <ColorSection title="UI Elements" colors={[
              { name: 'theme.borderColor', label: 'Borders', desc: 'Borders and dividers' },
              { name: 'theme.cardBackground', label: 'Cards', desc: 'Card and panel backgrounds' },
              { name: 'theme.headerBackground', label: 'Header', desc: 'Header background color' },
              { name: 'theme.footerBackground', label: 'Footer BG', desc: 'Footer background color' },
              { name: 'theme.footerTextColor', label: 'Footer Text', desc: 'Footer text color' }
            ]} formData={formData} handleChange={handleChange} />
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Font Families</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Heading Font</label>
                <select 
                  name="theme.fontHeading" 
                  value={formData.theme.fontHeading} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                  <option value="Montserrat">Montserrat (Modern Sans)</option>
                  <option value="Roboto">Roboto (Clean Sans)</option>
                  <option value="Lora">Lora (Readable Serif)</option>
                  <option value="Poppins">Poppins (Geometric Sans)</option>
                  <option value="Merriweather">Merriweather (Classic Serif)</option>
                  <option value="Raleway">Raleway (Elegant Sans)</option>
                  <option value="Oswald">Oswald (Bold Sans)</option>
                </select>
                <p style={styles.helpText}>Used for headings and titles</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Body Font</label>
                <select 
                  name="theme.fontBody" 
                  value={formData.theme.fontBody} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Roboto">Roboto (Clean)</option>
                  <option value="Open Sans">Open Sans (Friendly)</option>
                  <option value="Lato">Lato (Balanced)</option>
                  <option value="Inter">Inter (UI Optimized)</option>
                  <option value="Nunito">Nunito (Rounded)</option>
                  <option value="Source Sans Pro">Source Sans Pro (Professional)</option>
                </select>
                <p style={styles.helpText}>Used for body text and paragraphs</p>
              </div>

              <div>
                <label style={styles.label}>Base Font Size</label>
                <select 
                  name="theme.baseFontSize" 
                  value={formData.theme.baseFontSize} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="14px">14px (Small)</option>
                  <option value="16px">16px (Default)</option>
                  <option value="18px">18px (Large)</option>
                  <option value="20px">20px (Extra Large)</option>
                </select>
                <p style={styles.helpText}>Base size for all text on the site</p>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Typography Settings</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Line Height</label>
                <select 
                  name="theme.lineHeight" 
                  value={formData.theme.lineHeight} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="1.4">1.4 (Tight)</option>
                  <option value="1.6">1.6 (Default)</option>
                  <option value="1.8">1.8 (Relaxed)</option>
                  <option value="2.0">2.0 (Loose)</option>
                </select>
                <p style={styles.helpText}>Spacing between lines of text</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Letter Spacing</label>
                <select 
                  name="theme.letterSpacing" 
                  value={formData.theme.letterSpacing} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="normal">Normal</option>
                  <option value="0.5px">0.5px (Slight)</option>
                  <option value="1px">1px (Wide)</option>
                  <option value="2px">2px (Extra Wide)</option>
                </select>
                <p style={styles.helpText}>Spacing between characters</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={styles.label}>Heading Weight</label>
                  <select 
                    name="theme.headingWeight" 
                    value={formData.theme.headingWeight} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="400">400 (Normal)</option>
                    <option value="500">500 (Medium)</option>
                    <option value="600">600 (Semi-Bold)</option>
                    <option value="700">700 (Bold)</option>
                    <option value="800">800 (Extra Bold)</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Body Weight</label>
                  <select 
                    name="theme.bodyWeight" 
                    value={formData.theme.bodyWeight} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="300">300 (Light)</option>
                    <option value="400">400 (Normal)</option>
                    <option value="500">500 (Medium)</option>
                    <option value="600">600 (Semi-Bold)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spacing Tab */}
        {activeTab === 'spacing' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Layout Settings</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Container Max Width</label>
                <select 
                  name="theme.containerMaxWidth" 
                  value={formData.theme.containerMaxWidth} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="1140px">1140px (Narrow)</option>
                  <option value="1200px">1200px (Default)</option>
                  <option value="1400px">1400px (Wide)</option>
                  <option value="1600px">1600px (Extra Wide)</option>
                  <option value="100%">100% (Full Width)</option>
                </select>
                <p style={styles.helpText}>Maximum width of content containers</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Section Padding</label>
                <select 
                  name="theme.sectionPadding" 
                  value={formData.theme.sectionPadding} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="40px">40px (Compact)</option>
                  <option value="60px">60px (Comfortable)</option>
                  <option value="80px">80px (Default)</option>
                  <option value="100px">100px (Spacious)</option>
                  <option value="120px">120px (Extra Spacious)</option>
                </select>
                <p style={styles.helpText}>Vertical padding for page sections</p>
              </div>

              <div>
                <label style={styles.label}>Element Spacing</label>
                <select 
                  name="theme.elementSpacing" 
                  value={formData.theme.elementSpacing} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="12px">12px (Tight)</option>
                  <option value="16px">16px (Comfortable)</option>
                  <option value="20px">20px (Default)</option>
                  <option value="24px">24px (Relaxed)</option>
                  <option value="32px">32px (Spacious)</option>
                </select>
                <p style={styles.helpText}>Gap between UI elements</p>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Visual Style</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={styles.label}>Border Radius</label>
                <select 
                  name="theme.borderRadius" 
                  value={formData.theme.borderRadius} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="0px">0px (Sharp Corners)</option>
                  <option value="4px">4px (Subtle)</option>
                  <option value="8px">8px (Default)</option>
                  <option value="12px">12px (Rounded)</option>
                  <option value="16px">16px (Very Rounded)</option>
                  <option value="24px">24px (Extra Rounded)</option>
                </select>
                <p style={styles.helpText}>Roundness of corners on cards and buttons</p>
              </div>

              <div>
                <label style={styles.label}>Card Shadow</label>
                <select 
                  name="theme.cardShadow" 
                  value={formData.theme.cardShadow} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="none">None (Flat)</option>
                  <option value="0 1px 3px rgba(0,0,0,0.05)">Subtle</option>
                  <option value="0 2px 8px rgba(0,0,0,0.1)">Default</option>
                  <option value="0 4px 16px rgba(0,0,0,0.15)">Medium</option>
                  <option value="0 8px 24px rgba(0,0,0,0.2)">Strong</option>
                </select>
                <p style={styles.helpText}>Shadow depth for cards and panels</p>
              </div>
            </div>
          </div>
        )}

        {/* Header Tab */}
        {activeTab === 'header' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Header Customization</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={styles.label}>Header Style</label>
                  <select 
                    name="theme.headerStyle" 
                    value={formData.theme.headerStyle} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="solid">Solid</option>
                    <option value="transparent">Transparent</option>
                    <option value="sticky">Sticky (Fixed on Scroll)</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Header Height</label>
                  <select 
                    name="theme.headerHeight" 
                    value={formData.theme.headerHeight} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="60px">60px (Compact)</option>
                    <option value="80px">80px (Default)</option>
                    <option value="100px">100px (Tall)</option>
                    <option value="120px">120px (Extra Tall)</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Logo Position</label>
                  <select 
                    name="theme.logoPosition" 
                    value={formData.theme.logoPosition} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="left">Left Aligned</option>
                    <option value="center">Center Aligned</option>
                    <option value="right">Right Aligned</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Logo Size</label>
                  <select 
                    name="theme.logoSize" 
                    value={formData.theme.logoSize} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="80px">80px (Small)</option>
                    <option value="100px">100px (Medium)</option>
                    <option value="120px">120px (Default)</option>
                    <option value="150px">150px (Large)</option>
                    <option value="180px">180px (Extra Large)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Tab */}
        {activeTab === 'footer' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Footer Settings</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <label style={styles.label}>Footer Layout</label>
                  <select 
                    name="theme.footerLayout" 
                    value={formData.theme.footerLayout} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="1-column">1 Column</option>
                    <option value="2-column">2 Columns</option>
                    <option value="3-column">3 Columns</option>
                    <option value="4-column">4 Columns</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Footer Padding</label>
                  <select 
                    name="theme.footerPadding" 
                    value={formData.theme.footerPadding} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="40px">40px (Compact)</option>
                    <option value="60px">60px (Default)</option>
                    <option value="80px">80px (Spacious)</option>
                    <option value="100px">100px (Extra Spacious)</option>
                  </select>
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Contact Information</h4>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={styles.label}>Address</label>
                  <input 
                    type="text" 
                    name="contact.address" 
                    value={formData.contact.address} 
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="123 Church Street, City, State"
                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={styles.label}>Phone Number</label>
                    <input 
                      type="text" 
                      name="contact.phone" 
                      value={formData.contact.phone} 
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="+1 (555) 123-4567"
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Email Address</label>
                    <input 
                      type="email" 
                      name="contact.email" 
                      value={formData.contact.email} 
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="info@example.com"
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Tab */}
        {activeTab === 'buttons' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Button Styles</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={styles.label}>Border Radius</label>
                  <select 
                    name="theme.buttonBorderRadius" 
                    value={formData.theme.buttonBorderRadius} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="0px">0px (Sharp)</option>
                    <option value="4px">4px (Subtle)</option>
                    <option value="6px">6px (Default)</option>
                    <option value="8px">8px (Rounded)</option>
                    <option value="12px">12px (Very Rounded)</option>
                    <option value="24px">24px (Pill Shape)</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Padding</label>
                  <select 
                    name="theme.buttonPadding" 
                    value={formData.theme.buttonPadding} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="8px 16px">8px 16px (Compact)</option>
                    <option value="12px 24px">12px 24px (Default)</option>
                    <option value="16px 32px">16px 32px (Large)</option>
                    <option value="20px 40px">20px 40px (Extra Large)</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Font Size</label>
                  <select 
                    name="theme.buttonFontSize" 
                    value={formData.theme.buttonFontSize} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="14px">14px (Small)</option>
                    <option value="16px">16px (Default)</option>
                    <option value="18px">18px (Large)</option>
                    <option value="20px">20px (Extra Large)</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Font Weight</label>
                  <select 
                    name="theme.buttonFontWeight" 
                    value={formData.theme.buttonFontWeight} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="400">400 (Normal)</option>
                    <option value="500">500 (Medium)</option>
                    <option value="600">600 (Semi-Bold)</option>
                    <option value="700">700 (Bold)</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={styles.label}>Hover Effect</label>
                  <select 
                    name="theme.buttonHoverEffect" 
                    value={formData.theme.buttonHoverEffect} 
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="none">None</option>
                    <option value="lift">Lift (Translate Up)</option>
                    <option value="scale">Scale (Grow Slightly)</option>
                    <option value="glow">Glow (Shadow Effect)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Social Media Links</h3>
              <p style={{ ...styles.helpText, marginBottom: '24px' }}>
                Enter your social media profile URLs. Leave blank to hide the icon from your website.
              </p>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                {[
                  { name: 'facebook', label: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/yourpage' },
                  { name: 'twitter', label: 'Twitter / X', icon: '🐦', placeholder: 'https://twitter.com/yourhandle' },
                  { name: 'instagram', label: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/yourprofile' },
                  { name: 'youtube', label: 'YouTube', icon: '📺', placeholder: 'https://youtube.com/yourchannel' },
                  { name: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/company/yourcompany' }
                ].map(social => (
                  <div key={social.name}>
                    <label style={styles.label}>
                      <span style={{ marginRight: '8px' }}>{social.icon}</span>
                      {social.label}
                    </label>
                    <input 
                      type="url" 
                      name={`socialMedia.${social.name}`} 
                      value={formData.socialMedia[social.name]} 
                      onChange={handleChange}
                      placeholder={social.placeholder}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Advanced Settings</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    name="theme.darkModeEnabled" 
                    checked={formData.theme.darkModeEnabled} 
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#D4AF37' }}
                  />
                  <div>
                    <span style={{ fontWeight: '600', fontSize: '0.9375rem', color: '#111827' }}>Enable Dark Mode</span>
                    <p style={{ ...styles.helpText, marginTop: '4px', marginBottom: 0 }}>
                      Allow users to toggle between light and dark themes
                    </p>
                  </div>
                </label>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    name="theme.animationsEnabled" 
                    checked={formData.theme.animationsEnabled} 
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#D4AF37' }}
                  />
                  <div>
                    <span style={{ fontWeight: '600', fontSize: '0.9375rem', color: '#111827' }}>Enable Animations</span>
                    <p style={{ ...styles.helpText, marginTop: '4px', marginBottom: 0 }}>
                      Page transitions, hover effects, and smooth interactions
                    </p>
                  </div>
                </label>
              </div>

              <div>
                <label style={styles.label}>Scroll Behavior</label>
                <select 
                  name="theme.scrollBehavior" 
                  value={formData.theme.scrollBehavior} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="smooth">Smooth Scrolling</option>
                  <option value="instant">Instant Scrolling</option>
                </select>
                <p style={styles.helpText}>How the page scrolls when clicking anchor links</p>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Custom CSS</h3>
              <p style={{ ...styles.helpText, marginBottom: '16px' }}>
                Add custom CSS to override default styles. Advanced users only.
              </p>
              <textarea 
                name="theme.customCSS" 
                value={formData.theme.customCSS} 
                onChange={handleChange}
                placeholder="/* Your custom CSS here */&#10;.custom-class {&#10;  color: #333;&#10;}"
                rows={14}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  borderRadius: '8px', 
                  border: '1px solid #d1d5db', 
                  fontFamily: '"Fira Code", "Courier New", monospace',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  lineHeight: '1.6',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div style={{ 
          marginTop: '48px', 
          paddingTop: '32px', 
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button 
            type="submit" 
            disabled={saving}
            style={styles.saveButton}
            onMouseEnter={(e) => {
              if (!saving) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 12px -2px rgba(212, 175, 55, 0.4), 0 4px 8px -2px rgba(212, 175, 55, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!saving) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(212, 175, 55, 0.3), 0 2px 4px -1px rgba(212, 175, 55, 0.2)';
              }
            }}
          >
            {saving ? (
              <>
                <span>💾</span>
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Save & Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Helper component for color sections
function ColorSection({ title, colors, formData, handleChange }) {
  const cardStyle = {
    background: '#ffffff',
    padding: '28px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  };

  const titleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f3f4f6'
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{title}</h3>
      {colors.map(color => {
        const value = color.name.split('.').reduce((obj, key) => obj[key], formData);
        return (
          <div key={color.name} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <input 
              type="color" 
              name={color.name} 
              value={value} 
              onChange={handleChange}
              style={{ 
                width: '52px', 
                height: '52px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
            <div style={{ flex: 1 }}>
              <label style={{ 
                fontWeight: '600', 
                display: 'block', 
                fontSize: '0.875rem', 
                marginBottom: '4px',
                color: '#111827'
              }}>
                {color.label}
              </label>
              <span style={{ fontSize: '0.8125rem', color: '#6b7280', lineHeight: '1.4' }}>
                {color.desc}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Appearance;
