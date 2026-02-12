import React from 'react';

function SelectField({ field, value, onChange, error }) {
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '1rem',
          border: error ? '2px solid #dc3545' : '2px solid #e0e0e0',
          borderRadius: '6px',
          outline: 'none',
          transition: 'border-color 0.2s',
          backgroundColor: 'white',
          cursor: 'pointer',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => !error && (e.target.style.borderColor = '#D4AF37')}
        onBlur={(e) => !error && (e.target.style.borderColor = '#e0e0e0')}
      >
        <option value="">-- Select an option --</option>
        {field.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default SelectField;
