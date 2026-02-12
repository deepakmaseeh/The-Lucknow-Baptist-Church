import React from 'react';

function RadioField({ field, value, onChange, error }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        marginBottom: '12px',
        fontSize: '0.95rem',
        fontWeight: '500',
        color: '#333'
      }}>
        {field.label}
        {field.required && <span style={{ color: '#dc3545', marginLeft: '4px' }}>*</span>}
      </label>
      {field.options?.map((option, index) => (
        <label key={index} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          cursor: 'pointer'
        }}>
          <input
            type="radio"
            name={field.id}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            style={{
              width: '18px',
              height: '18px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '0.95rem', color: '#333' }}>{option.label}</span>
        </label>
      ))}
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

export default RadioField;
