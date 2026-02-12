import React, { useState } from 'react';

function StyleInspector({ block, onUpdateStyles }) {
  const [activeTab, setActiveTab] = useState('layout');

  if (!block) {
    return (
      <div style={{
        width: '280px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
        borderLeft: '1px solid #e0e0e0',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        textAlign: 'center',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.03)'
      }}>
        <div>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px', filter: 'grayscale(0.3)' }}>🎨</div>
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>Select a block to edit its styles</p>
        </div>
      </div>
    );
  }

  const handleChange = (property, value) => {
    onUpdateStyles({ [property]: value });
  };

  return (
    <div style={{
      width: '280px',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
      borderLeft: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.03)'
    }}>
      {/* Header */}
      <div style={{ padding: '16px 14px', borderBottom: '2px solid #f0f0f0', background: 'white' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#1a1a1a', letterSpacing: '-0.3px' }}>Style Inspector</h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#666', fontWeight: '500' }}>
          {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #f0f0f0', overflowX: 'auto', background: 'white' }}>
        {['Spacing', 'Colors', 'Borders', 'Effects', 'Typography'].map(tab => (
          <button
            key={tab.toLowerCase()}
            onClick={() => setActiveTab(tab.toLowerCase())}
            style={{
              flex: 1,
              minWidth: '50px',
              padding: '8px 4px',
              background: activeTab === tab.toLowerCase() ? 'white' : '#f9f9f9',
              border: 'none',
              borderBottom: activeTab === tab.toLowerCase() ? '3px solid #D4AF37' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '0.7rem',
              fontWeight: activeTab === tab.toLowerCase() ? '700' : '500',
              color: activeTab === tab.toLowerCase() ? '#D4AF37' : '#666',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px' }}>
        {activeTab === 'layout' && (
          <LayoutControls block={block} onChange={handleChange} />
        )}
        {activeTab === 'spacing' && (
          <SpacingControls block={block} onChange={handleChange} />
        )}
        {activeTab === 'colors' && (
          <ColorControls block={block} onChange={handleChange} />
        )}
        {activeTab === 'borders' && (
          <BorderControls block={block} onChange={handleChange} />
        )}
        {activeTab === 'effects' && (
          <EffectsControls block={block} onChange={handleChange} />
        )}
        {activeTab === 'typography' && (
          <TypographyControls block={block} onChange={handleChange} />
        )}
      </div>
    </div>
  );
}

function LayoutControls({ block, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500' }}>
          Display
        </label>
        <select
          value={block.styles.display || 'block'}
          onChange={(e) => onChange('display', e.target.value)}
          style={selectStyle}
        >
          <option value="block">Block</option>
          <option value="inline-block">Inline Block</option>
          <option value="flex">Flex</option>
          <option value="grid">Grid</option>
          <option value="none">None (Hidden)</option>
        </select>
      </div>

      {block.styles.display === 'flex' && (
        <>
          <div>
            <label style={labelStyle}>Flex Direction</label>
            <select value={block.styles.flexDirection || 'row'} onChange={(e) => onChange('flexDirection', e.target.value)} style={selectStyle}>
              <option value="row">Row</option>
              <option value="column">Column</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Justify Content</label>
            <select value={block.styles.justifyContent || 'flex-start'} onChange={(e) => onChange('justifyContent', e.target.value)} style={selectStyle}>
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
              <option value="space-between">Space Between</option>
              <option value="space-around">Space Around</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Align Items</label>
            <select value={block.styles.alignItems || 'stretch'} onChange={(e) => onChange('alignItems', e.target.value)} style={selectStyle}>
              <option value="stretch">Stretch</option>
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
            </select>
          </div>
          <StyleInput label="Gap" value={block.styles.gap || ''} onChange={(v) => onChange('gap', v)} placeholder="e.g., 20px" />
        </>
      )}

      <StyleInput label="Width" value={block.styles.width || ''} onChange={(v) => onChange('width', v)} placeholder="e.g., 100%, 500px, auto" />
      <StyleInput label="Max Width" value={block.styles.maxWidth || ''} onChange={(v) => onChange('maxWidth', v)} placeholder="e.g., 1200px" />
      <StyleInput label="Height" value={block.styles.height || ''} onChange={(v) => onChange('height', v)} placeholder="e.g., auto, 300px" />
      <StyleInput label="Min Height" value={block.styles.minHeight || ''} onChange={(v) => onChange('minHeight', v)} placeholder="e.g., 200px" />

      <div>
        <label style={labelStyle}>Position</label>
        <select value={block.styles.position || 'static'} onChange={(e) => onChange('position', e.target.value)} style={selectStyle}>
          <option value="static">Static</option>
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </select>
      </div>

      {block.styles.position !== 'static' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <StyleInput label="Top" value={block.styles.top || ''} onChange={(v) => onChange('top', v)} placeholder="0" />
          <StyleInput label="Right" value={block.styles.right || ''} onChange={(v) => onChange('right', v)} placeholder="0" />
          <StyleInput label="Bottom" value={block.styles.bottom || ''} onChange={(v) => onChange('bottom', v)} placeholder="0" />
          <StyleInput label="Left" value={block.styles.left || ''} onChange={(v) => onChange('left', v)} placeholder="0" />
        </div>
      )}

      <StyleInput label="Z-Index" value={block.styles.zIndex || ''} onChange={(v) => onChange('zIndex', v)} placeholder="e.g., 10" />
    </div>
  );
}

function SpacingControls({ block, onChange }) {
  const [paddingLinked, setPaddingLinked] = useState(true);
  const [marginLinked, setMarginLinked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Padding */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={labelStyle}>Padding</label>
          <button
            onClick={() => setPaddingLinked(!paddingLinked)}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              background: paddingLinked ? '#D4AF37' : '#e0e0e0',
              color: paddingLinked ? 'white' : '#666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {paddingLinked ? '🔗 Linked' : '🔓 Unlinked'}
          </button>
        </div>
        
        {paddingLinked ? (
          <StyleInput value={block.styles.padding || ''} onChange={(v) => onChange('padding', v)} placeholder="e.g., 20px" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <StyleInput label="Top" value={block.styles.paddingTop || ''} onChange={(v) => onChange('paddingTop', v)} placeholder="0" />
            <StyleInput label="Right" value={block.styles.paddingRight || ''} onChange={(v) => onChange('paddingRight', v)} placeholder="0" />
            <StyleInput label="Bottom" value={block.styles.paddingBottom || ''} onChange={(v) => onChange('paddingBottom', v)} placeholder="0" />
            <StyleInput label="Left" value={block.styles.paddingLeft || ''} onChange={(v) => onChange('paddingLeft', v)} placeholder="0" />
          </div>
        )}
      </div>

      {/* Margin */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={labelStyle}>Margin</label>
          <button
            onClick={() => setMarginLinked(!marginLinked)}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              background: marginLinked ? '#D4AF37' : '#e0e0e0',
              color: marginLinked ? 'white' : '#666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {marginLinked ? '🔗 Linked' : '🔓 Unlinked'}
          </button>
        </div>
        
        {marginLinked ? (
          <StyleInput value={block.styles.margin || ''} onChange={(v) => onChange('margin', v)} placeholder="e.g., 20px 0" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <StyleInput label="Top" value={block.styles.marginTop || ''} onChange={(v) => onChange('marginTop', v)} placeholder="0" />
            <StyleInput label="Right" value={block.styles.marginRight || ''} onChange={(v) => onChange('marginRight', v)} placeholder="0" />
            <StyleInput label="Bottom" value={block.styles.marginBottom || ''} onChange={(v) => onChange('marginBottom', v)} placeholder="0" />
            <StyleInput label="Left" value={block.styles.marginLeft || ''} onChange={(v) => onChange('marginLeft', v)} placeholder="0" />
          </div>
        )}
      </div>
    </div>
  );
}

function BorderControls({ block, onChange }) {
  const [borderLinked, setBorderLinked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={labelStyle}>Border Style</label>
        <select value={block.styles.borderStyle || 'none'} onChange={(e) => onChange('borderStyle', e.target.value)} style={selectStyle}>
          <option value="none">None</option>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
      </div>

      {block.styles.borderStyle && block.styles.borderStyle !== 'none' && (
        <>
          <StyleInput label="Border Width" value={block.styles.borderWidth || ''} onChange={(v) => onChange('borderWidth', v)} placeholder="e.g., 1px" />
          <ColorInput label="Border Color" value={block.styles.borderColor || '#e0e0e0'} onChange={(v) => onChange('borderColor', v)} />
        </>
      )}

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={labelStyle}>Border Radius</label>
          <button
            onClick={() => setBorderLinked(!borderLinked)}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              background: borderLinked ? '#D4AF37' : '#e0e0e0',
              color: borderLinked ? 'white' : '#666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {borderLinked ? '🔗 Linked' : '🔓 Unlinked'}
          </button>
        </div>
        
        {borderLinked ? (
          <StyleInput value={block.styles.borderRadius || ''} onChange={(v) => onChange('borderRadius', v)} placeholder="e.g., 8px" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <StyleInput label="Top-Left" value={block.styles.borderTopLeftRadius || ''} onChange={(v) => onChange('borderTopLeftRadius', v)} placeholder="0" />
            <StyleInput label="Top-Right" value={block.styles.borderTopRightRadius || ''} onChange={(v) => onChange('borderTopRightRadius', v)} placeholder="0" />
            <StyleInput label="Bottom-Right" value={block.styles.borderBottomRightRadius || ''} onChange={(v) => onChange('borderBottomRightRadius', v)} placeholder="0" />
            <StyleInput label="Bottom-Left" value={block.styles.borderBottomLeftRadius || ''} onChange={(v) => onChange('borderBottomLeftRadius', v)} placeholder="0" />
          </div>
        )}
      </div>
    </div>
  );
}

function EffectsControls({ block, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={labelStyle}>Box Shadow</label>
        <input
          type="text"
          value={block.styles.boxShadow || ''}
          onChange={(e) => onChange('boxShadow', e.target.value)}
          placeholder="e.g., 0 4px 6px rgba(0,0,0,0.1)"
          style={inputStyle}
        />
        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#999' }}>
          <div>Presets:</div>
          <div style={{ display: 'flex', gap: '5px', marginTop: '5px', flexWrap: 'wrap' }}>
            <button onClick={() => onChange('boxShadow', '0 2px 4px rgba(0,0,0,0.1)')} style={presetButtonStyle}>Small</button>
            <button onClick={() => onChange('boxShadow', '0 4px 6px rgba(0,0,0,0.1)')} style={presetButtonStyle}>Medium</button>
            <button onClick={() => onChange('boxShadow', '0 10px 15px rgba(0,0,0,0.1)')} style={presetButtonStyle}>Large</button>
            <button onClick={() => onChange('boxShadow', 'none')} style={presetButtonStyle}>None</button>
          </div>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={block.styles.opacity || 1}
          onChange={(e) => onChange('opacity', e.target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '5px' }}>
          {(block.styles.opacity || 1) * 100}%
        </div>
      </div>

      <div>
        <label style={labelStyle}>Transform</label>
        <input
          type="text"
          value={block.styles.transform || ''}
          onChange={(e) => onChange('transform', e.target.value)}
          placeholder="e.g., rotate(5deg) scale(1.1)"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Transition</label>
        <input
          type="text"
          value={block.styles.transition || ''}
          onChange={(e) => onChange('transition', e.target.value)}
          placeholder="e.g., all 0.3s ease"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Overflow</label>
        <select value={block.styles.overflow || 'visible'} onChange={(e) => onChange('overflow', e.target.value)} style={selectStyle}>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="scroll">Scroll</option>
          <option value="auto">Auto</option>
        </select>
      </div>
    </div>
  );
}

function ColorControls({ block, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ColorInput label="Background Color" value={block.styles.backgroundColor || '#ffffff'} onChange={(v) => onChange('backgroundColor', v)} />
      
      <div>
        <label style={labelStyle}>Background Gradient</label>
        <input
          type="text"
          value={block.styles.backgroundImage || ''}
          onChange={(e) => onChange('backgroundImage', e.target.value)}
          placeholder="e.g., linear-gradient(to right, #fff, #000)"
          style={inputStyle}
        />
        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#999' }}>
          <div>Presets:</div>
          <div style={{ display: 'flex', gap: '5px', marginTop: '5px', flexWrap: 'wrap' }}>
            <button onClick={() => onChange('backgroundImage', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')} style={presetButtonStyle}>Purple</button>
            <button onClick={() => onChange('backgroundImage', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')} style={presetButtonStyle}>Pink</button>
            <button onClick={() => onChange('backgroundImage', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)')} style={presetButtonStyle}>Blue</button>
            <button onClick={() => onChange('backgroundImage', 'none')} style={presetButtonStyle}>None</button>
          </div>
        </div>
      </div>

      <ColorInput label="Text Color" value={block.styles.color || '#333333'} onChange={(v) => onChange('color', v)} />
    </div>
  );
}

function TypographyControls({ block, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <StyleInput label="Font Size" value={block.styles.fontSize || ''} onChange={(v) => onChange('fontSize', v)} placeholder="e.g., 16px, 1rem" />
      
      <div>
        <label style={labelStyle}>Font Weight</label>
        <select value={block.styles.fontWeight || '400'} onChange={(e) => onChange('fontWeight', e.target.value)} style={selectStyle}>
          <option value="300">Light (300)</option>
          <option value="400">Normal (400)</option>
          <option value="500">Medium (500)</option>
          <option value="600">Semi-Bold (600)</option>
          <option value="700">Bold (700)</option>
          <option value="800">Extra-Bold (800)</option>
        </select>
      </div>

      <StyleInput label="Line Height" value={block.styles.lineHeight || ''} onChange={(v) => onChange('lineHeight', v)} placeholder="e.g., 1.5, 24px" />
      <StyleInput label="Letter Spacing" value={block.styles.letterSpacing || ''} onChange={(v) => onChange('letterSpacing', v)} placeholder="e.g., 0.5px" />

      <div>
        <label style={labelStyle}>Text Align</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
          {['left', 'center', 'right', 'justify'].map(align => (
            <button
              key={align}
              onClick={() => onChange('textAlign', align)}
              style={{
                padding: '8px',
                background: block.styles.textAlign === align ? '#D4AF37' : '#f9f9f9',
                color: block.styles.textAlign === align ? 'white' : '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Text Transform</label>
        <select value={block.styles.textTransform || 'none'} onChange={(e) => onChange('textTransform', e.target.value)} style={selectStyle}>
          <option value="none">None</option>
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="capitalize">Capitalize</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Text Decoration</label>
        <select value={block.styles.textDecoration || 'none'} onChange={(e) => onChange('textDecoration', e.target.value)} style={selectStyle}>
          <option value="none">None</option>
          <option value="underline">Underline</option>
          <option value="line-through">Line Through</option>
          <option value="overline">Overline</option>
        </select>
      </div>
    </div>
  );
}

// Helper Components
function StyleInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function ColorInput({ label, value, onChange }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '50px',
            height: '40px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
      </div>
    </div>
  );
}

// Styles
const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '0.85rem',
  fontWeight: '500'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  fontSize: '0.9rem'
};

const selectStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  fontSize: '0.9rem',
  background: 'white'
};

const presetButtonStyle = {
  padding: '4px 8px',
  fontSize: '0.7rem',
  background: '#f9f9f9',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default StyleInspector;
