import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import ComponentPanel from '../../components/pageBuilder/ComponentPanel';
import Canvas from '../../components/pageBuilder/Canvas';
import StyleInspector from '../../components/pageBuilder/StyleInspector';
import Toolbar from '../../components/pageBuilder/Toolbar';
import AdminLayout from '../../components/admin/AdminLayout';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { getApiUrl } from '../../utils/api';
import { getTemplate } from '../../components/pageBuilder/templates';

function PageBuilder() {
  const { config } = useSiteConfig();
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [pageTitle, setPageTitle] = useState('New Page');
  const [pageSlug, setPageSlug] = useState('new-page');
  const [saving, setSaving] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [previewMode, setPreviewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Add new block from component  // Add new block
  const handleAddBlock = (type) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      props: getDefaultProps(type),
      styles: {}
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlock(newBlock);
  };

  // Get default props for each block type
  const getDefaultProps = (type) => {
    const defaults = {
      form: {
        formId: `form-${Date.now()}`,
        title: 'Contact Us',
        description: '',
        submitButtonText: 'Send Message',
        successMessage: 'Thank you! We\'ll be in touch soon.',
        errorMessage: 'Something went wrong. Please try again.',
        emailNotification: {
          enabled: true,
          recipients: [],
          subject: 'New Form Submission'
        },
        fields: [
          {
            id: 'field-1',
            type: 'text',
            label: 'Full Name',
            placeholder: 'John Doe',
            required: true,
            validation: { minLength: 2, maxLength: 100 }
          },
          {
            id: 'field-2',
            type: 'email',
            label: 'Email Address',
            placeholder: 'john@example.com',
            required: true
          },
          {
            id: 'field-3',
            type: 'textarea',
            label: 'Message',
            placeholder: 'Your message...',
            required: true,
            rows: 5
          }
        ]
      }
    };
    return defaults[type] || {};
  };


  // Handle drag end (reordering)
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Update block styles
  const handleUpdateStyles = (blockId, newStyles) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, styles: { ...block.styles, ...newStyles } } : block
    ));
  };

  // Update block props
  const handleUpdateProps = (blockId, newProps) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, props: { ...block.props, ...newProps } } : block
    ));
  };

  // Delete block
  const handleDeleteBlock = (blockId) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  // Load template
  const handleLoadTemplate = (templateId) => {
    const template = getTemplate(templateId);
    setBlocks(template.blocks.map(block => ({
      ...block,
      id: `block-${Date.now()}-${Math.random()}`
    })));
    setSelectedBlock(null);
  };

  // Save page
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(getApiUrl('/api/pages'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: pageTitle,
          slug: pageSlug,
          blocks,
          status: 'draft'
        })
      });

      if (response.ok) {
        alert('Page saved successfully!');
      } else {
        alert('Failed to save page');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout fullWidth>
      <div style={{ 
        height: 'calc(100vh - 65px)', 
        display: 'flex', 
        flexDirection: 'column', 
        background: '#f5f5f5' 
      }}>
        {!previewMode && (
          <Toolbar
            pageTitle={pageTitle}
            pageSlug={pageSlug}
            onTitleChange={setPageTitle}
            onSlugChange={setPageSlug}
            onSave={handleSave}
            saving={saving}
            deviceMode={deviceMode}
            onDeviceModeChange={setDeviceMode}
            onLoadTemplate={handleLoadTemplate}
            previewMode={previewMode}
            onTogglePreview={() => setPreviewMode(!previewMode)}
          />
        )}
        
        {previewMode && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 100
          }}>
            <button
              onClick={() => setPreviewMode(false)}
              style={{
                padding: '10px 20px',
                background: '#D4AF37',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              👁️ Exit Preview
            </button>
          </div>
        )}
        
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {!previewMode && <ComponentPanel onAddBlock={handleAddBlock} />}
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              <Canvas
                blocks={blocks}
                selectedBlock={selectedBlock}
                onSelectBlock={setSelectedBlock}
                onUpdateProps={handleUpdateProps}
                onDeleteBlock={handleDeleteBlock}
                deviceMode={deviceMode}
              />
            </SortableContext>
          </DndContext>
          
          {!previewMode && (
            <StyleInspector
              block={selectedBlock}
              onUpdateStyles={(styles) => {
                if (selectedBlock) {
                  handleUpdateProps(selectedBlock.id, { 
                    styles: { ...selectedBlock.styles, ...styles } 
                  });
                }
              }}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// Default props for each block type
function getDefaultProps(blockType) {
  const defaults = {
    section: {},
    heading: { text: 'Heading Text', tag: 'h2' },
    paragraph: { text: 'This is a paragraph. Click to edit.' },
    image: { src: '', alt: '' },
    button: { text: 'Click Me', link: '#' },
    spacer: { height: '40px' },
    divider: {},
    columns: { count: 2 }
  };
  return defaults[blockType] || {};
}

// Default styles using Appearance settings
function getDefaultStyles(blockType, config) {
  const defaults = {
    section: {
      padding: '20px',
      backgroundColor: '#ffffff'
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: config?.theme?.secondaryColor || '#111111',
      fontFamily: config?.theme?.fontHeading || 'Playfair Display',
      marginBottom: '20px'
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#333333',
      fontFamily: config?.theme?.fontBody || 'Roboto',
      marginBottom: '15px'
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px'
    },
    button: {
      padding: '12px 30px',
      backgroundColor: config?.theme?.primaryColor || '#D4AF37',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-block'
    },
    spacer: {
      height: '40px'
    },
    divider: {
      height: '1px',
      backgroundColor: '#e0e0e0',
      margin: '30px 0'
    },
    columns: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    }
  };
  return defaults[blockType] || {};
}

export default PageBuilder;
