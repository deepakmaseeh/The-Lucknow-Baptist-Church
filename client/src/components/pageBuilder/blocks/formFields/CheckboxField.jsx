import React from 'react';

function CheckboxField({ field, value, onChange, error }) {
  const handleChange = (optionValue) => {
    if (field.multiple) {
      // Multiple checkboxes - value is an array
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      // Single checkbox - value is boolean
      onChange(!value);
    }
  };

  if (field.multiple && field.options) {
    // Multiple checkboxes with options
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
        {field.options.map((option, index) => (
          <label key={index} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(option.value)}
              onChange={() => handleChange(option.value)}
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

  // Single checkbox
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}>
        <input
          type="checkbox"
          checked={!!value}
          onChange={() => handleChange()}
          required={field.required}
          style={{
            width: '18px',
            height: '18px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        />
        <span style={{ fontSize: '0.95rem', color: '#333', fontWeight: '500' }}>
          {field.label}
          {field.required && <span style={{ color: '#dc3545', marginLeft: '4px' }}>*</span>}
        </span>
      </label>
      {error && (
        <div style={{
          marginTop: '6px',
          marginLeft: '28px',
          fontSize: '0.85rem',
          color: '#dc3545'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default CheckboxField;
