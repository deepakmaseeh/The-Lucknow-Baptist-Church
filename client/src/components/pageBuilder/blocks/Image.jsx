import React from 'react';

function Image({ src, alt, styles }) {
  if (!src) {
    return (
      <div style={{
        ...styles,
        background: '#f5f5f5',
        border: '2px dashed #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        color: '#999'
      }}>
        🖼️ Image placeholder - Add image URL in props
      </div>
    );
  }

  return <img src={src} alt={alt || ''} style={styles} />;
}

export default Image;
