import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlockRenderer from './blocks/BlockRenderer';

function Canvas({ blocks, selectedBlock, onSelectBlock, onUpdateProps, onDeleteBlock, deviceMode = 'desktop' }) {
  // Device widths
  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  if (blocks.length === 0) {
    return (
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px',
          background: 'white',
          padding: '60px 40px',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '24px',
            filter: 'grayscale(0.3)'
          }}>📄</div>
          <h2 style={{ 
            marginBottom: '12px', 
            color: '#1a1a1a',
            fontSize: '1.8rem',
            fontWeight: '700'
          }}>Start Building Your Page</h2>
          <p style={{ 
            color: '#666',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            Click on components from the left panel to add them to your page, or choose a template to get started quickly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '50px 30px',
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        width: deviceWidths[deviceMode],
        maxWidth: deviceMode === 'desktop' ? '1200px' : deviceWidths[deviceMode],
        background: 'white',
        minHeight: '700px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        borderRadius: deviceMode === 'mobile' ? '24px' : '12px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0,0,0,0.06)'
      }}>
        {blocks.map((block) => (
          <SortableBlock
            key={block.id}
            block={block}
            isSelected={selectedBlock?.id === block.id}
            onSelect={() => onSelectBlock(block)}
            onUpdateProps={onUpdateProps}
            onDelete={() => onDeleteBlock(block.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SortableBlock({ block, isSelected, onSelect, onUpdateProps, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        onClick={onSelect}
        style={{
          outline: isSelected ? '3px solid #D4AF37' : 'none',
          outlineOffset: '-3px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'outline 0.2s'
        }}
      >
        {isSelected && (
          <>
            <div style={{
              position: 'absolute',
              top: '-24px',
              left: '-3px',
              background: '#D4AF37',
              color: 'white',
              padding: '2px 10px',
              borderRadius: '4px 4px 0 0',
              fontSize: '0.75rem',
              fontWeight: '600',
              zIndex: 9,
              textTransform: 'capitalize'
            }}>
              {block.type}
            </div>
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '12px',
              display: 'flex',
              gap: '8px',
              zIndex: 10
            }}>
              <button
                {...listeners}
              style={{
                padding: '8px 14px',
                background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'grab',
                fontSize: '0.85rem',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              ⬍ Move
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Delete this block?')) {
                  onDelete();
                }
              }}
              style={{
                padding: '8px 14px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🗑️ Delete
            </button>
          </div>
          </>
        )}
        
        <BlockRenderer
          block={block}
          onUpdateProps={(newProps) => onUpdateProps(block.id, newProps)}
        />
      </div>
    </div>
  );
}

export default Canvas;
