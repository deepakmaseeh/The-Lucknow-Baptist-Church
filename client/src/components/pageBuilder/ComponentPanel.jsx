import React from 'react';

const BLOCKS = [
  { type: 'section', label: 'Section', icon: '📦', description: 'Container' },
  { type: 'heading', label: 'Heading', icon: 'H', description: 'H1-H6' },
  { type: 'paragraph', label: 'Paragraph', icon: 'P', description: 'Text' },
  { type: 'image', label: 'Image', icon: '🖼️', description: 'Picture' },
  { type: 'button', label: 'Button', icon: '🔘', description: 'CTA' },
  { type: 'columns', label: 'Columns', icon: '⚏', description: '2-4 cols' },
  { type: 'form', label: 'Form', icon: '📝', description: 'Contact' },
  { type: 'spacer', label: 'Spacer', icon: '↕️', description: 'Space' },
  { type: 'divider', label: 'Divider', icon: '—', description: 'Line' }
];


function ComponentPanel({ onAddBlock }) {
  return (
    <div style={{
      width: '240px',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
      borderRight: '1px solid #e0e0e0',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 10px rgba(0,0,0,0.03)'
    }}>
      <div style={{ 
        padding: '16px 14px', 
        borderBottom: '2px solid #f0f0f0',
        background: 'white'
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.05rem', 
          fontWeight: '700',
          color: '#1a1a1a',
          letterSpacing: '-0.3px'
        }}>Components</h3>
        <p style={{ 
          margin: '4px 0 0', 
          fontSize: '0.75rem', 
          color: '#666',
          fontWeight: '400'
        }}>
          Click to add
        </p>
      </div>

      <div style={{ 
        padding: '12px 10px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '6px' 
      }}>
        {BLOCKS.map(block => (
          <button
            key={block.type}
            onClick={() => onAddBlock(block.type)}
            style={{
              padding: '10px 12px',
              background: 'white',
              border: '2px solid #e8e8e8',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'left',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fafafa';
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.transform = 'translateX(2px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 175, 55, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e8e8e8';
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
            }}
          >
            <span style={{ 
              fontSize: '1.4rem', 
              width: '24px', 
              textAlign: 'center',
              flexShrink: 0
            }}>
              {block.icon}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontWeight: '600', 
                fontSize: '0.85rem',
                color: '#1a1a1a',
                marginBottom: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{block.label}</div>
              <div style={{ 
                fontSize: '0.7rem', 
                color: '#888', 
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {block.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ComponentPanel;
