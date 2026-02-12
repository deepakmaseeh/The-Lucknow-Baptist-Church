import React from 'react';

function Toolbar({ 
  pageTitle, 
  pageSlug, 
  onTitleChange, 
  onSlugChange, 
  onSave, 
  saving,
  deviceMode,
  onDeviceModeChange,
  onLoadTemplate,
  onTogglePreview
}) {
  const templates = [
    { id: 'blank', name: 'Blank Page' },
    { id: 'hero', name: 'Hero Section' },
    { id: 'about', name: 'About Page' },
    { id: 'contact', name: 'Contact Page' },
    { id: 'landing', name: 'Landing Page' }
  ];

  return (
    <div style={{
      height: '65px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      borderBottom: '2px solid #e8e8e8',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>
      {/* Page Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '350px' }}>
        <input
          type="text"
          value={pageTitle}
          onChange={(e) => {
            onTitleChange(e.target.value);
            // Auto-generate slug from title
            const slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            onSlugChange(slug);
          }}
          placeholder="Page Title"
          style={{
            padding: '8px 12px',
            fontSize: '1.05rem',
            fontWeight: '700',
            border: '2px solid #e8e8e8',
            borderRadius: '6px',
            outline: 'none',
            transition: 'all 0.2s',
            background: 'white',
            color: '#1a1a1a'
          }}
          onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
          onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
        />
        <input
          type="text"
          value={pageSlug}
          onChange={(e) => onSlugChange(e.target.value)}
          placeholder="page-slug"
          style={{
            padding: '4px 12px',
            fontSize: '0.75rem',
            color: '#666',
            border: '2px solid #e8e8e8',
            borderRadius: '5px',
            outline: 'none',
            transition: 'all 0.2s',
            background: 'white',
            fontFamily: 'monospace'
          }}
          onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
          onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
        />
      </div>

      {/* Device Preview Toggle */}
      <div style={{ 
        display: 'flex', 
        gap: '5px', 
        background: '#f0f0f0', 
        padding: '5px', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        {['desktop', 'tablet', 'mobile'].map(mode => (
          <button
            key={mode}
            onClick={() => onDeviceModeChange(mode)}
            style={{
              padding: '8px 14px',
              background: deviceMode === mode ? 'linear-gradient(135deg, #D4AF37 0%, #C9A532 100%)' : 'transparent',
              color: deviceMode === mode ? 'white' : '#666',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: deviceMode === mode ? '600' : 'normal',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: deviceMode === mode ? '0 2px 6px rgba(212, 175, 55, 0.25)' : 'none'
            }}
            title={mode.charAt(0).toUpperCase() + mode.slice(1)}
            onMouseEnter={(e) => {
              if (deviceMode !== mode) {
                e.currentTarget.style.background = '#e8e8e8';
              }
            }}
            onMouseLeave={(e) => {
              if (deviceMode !== mode) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {mode === 'desktop' && '🖥️'}
            {mode === 'tablet' && '📱'}
            {mode === 'mobile' && '📱'}
          </button>
        ))}
      </div>

      {/* Template Selector */}
      <select
        onChange={(e) => {
          if (e.target.value && window.confirm('Load template? This will replace current content.')) {
            onLoadTemplate(e.target.value);
          }
          e.target.value = '';
        }}
        style={{
          padding: '9px 14px',
          fontSize: '0.85rem',
          border: '2px solid #e8e8e8',
          borderRadius: '6px',
          cursor: 'pointer',
          background: 'white',
          fontWeight: '500',
          color: '#333',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.borderColor = '#D4AF37'}
        onMouseLeave={(e) => e.target.style.borderColor = '#e8e8e8'}
      >
        <option value="">📄 Templates</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>{template.name}</option>
        ))}
      </select>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={onTogglePreview}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            color: '#666',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
          title="Preview Page"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f9f9f9';
            e.currentTarget.style.borderColor = '#ccc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}
        >
          👁️ <span style={{ display: 'none', '@media (min-width: 1000px)': { display: 'inline' } }}>Preview</span>
        </button>

        <span style={{ 
          fontSize: '0.8rem', 
          color: saving ? '#D4AF37' : '#999',
          fontWeight: '500',
          minWidth: '55px'
        }}>
          {saving ? '💾 Saving...' : '✓ Ready'}
        </span>
        
        <button
          onClick={onSave}
          disabled={saving}
          className="btn-gold"
          style={{
            padding: '10px 24px',
            fontSize: '0.9rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.6 : 1,
            fontWeight: '600',
            borderRadius: '6px',
            boxShadow: saving ? 'none' : '0 3px 10px rgba(212, 175, 55, 0.2)',
            transition: 'all 0.2s'
          }}
        >
          {saving ? '💾 Saving...' : '💾 SAVE PAGE'}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
