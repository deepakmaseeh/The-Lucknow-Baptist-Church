import React, { useState } from 'react';

function FileUploadField({ field, value, onChange, error }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB by default)
      const maxSize = field.validation?.maxSize || 5 * 1024 * 1024;
      if (file.size > maxSize) {
        onChange({ error: `File size must be less than ${maxSize / 1024 / 1024}MB` });
        return;
      }

      // Validate file type
      if (field.validation?.allowedTypes) {
        const fileType = file.type;
        if (!field.validation.allowedTypes.includes(fileType)) {
          onChange({ error: 'File type not allowed' });
          return;
        }
      }

      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.95rem',
        fontWeight: '500',
        color: '#333'
      }}>
        {field.label}
        {field.required && <span style={{ color: '#dc3545', marginLeft: '4px' }}>*</span>}
      </label>
      <div style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%'
      }}>
        <input
          type="file"
          onChange={handleFileChange}
          required={field.required}
          accept={field.validation?.allowedTypes?.join(',')}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }}
        />
        <div style={{
          padding: '12px 16px',
          border: error ? '2px solid #dc3545' : '2px dashed #e0e0e0',
          borderRadius: '6px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => !error && (e.currentTarget.style.borderColor = '#D4AF37')}
        onMouseLeave={(e) => !error && (e.currentTarget.style.borderColor = '#e0e0e0')}
        >
          {fileName ? (
            <span style={{ fontSize: '0.95rem', color: '#333' }}>
              📎 {fileName}
            </span>
          ) : (
            <span style={{ fontSize: '0.95rem', color: '#666' }}>
              📁 Click to upload or drag and drop
            </span>
          )}
        </div>
      </div>
      {field.validation && (
        <div style={{
          marginTop: '6px',
          fontSize: '0.8rem',
          color: '#666'
        }}>
          {field.validation.allowedTypes && `Allowed: ${field.validation.allowedTypes.join(', ')}`}
          {field.validation.maxSize && ` • Max size: ${field.validation.maxSize / 1024 / 1024}MB`}
        </div>
      )}
      {error && (
        <div style={{
          marginTop: '6px',
          fontSize: '0.85rem',
          color: '#dc3545'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default FileUploadField;
