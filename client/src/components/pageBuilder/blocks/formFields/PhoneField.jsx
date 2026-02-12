import React from 'react';

function PhoneField({ field, value, onChange, error }) {
  // Format phone number as user types (US format)
  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      let formatted = '';
      if (match[1]) formatted += `(${match[1]}`;
      if (match[2]) formatted += `) ${match[2]}`;
      if (match[3]) formatted += `-${match[3]}`;
      return formatted;
    }
    return input;
  };

  const handleChange = (input) => {
    const formatted = formatPhoneNumber(input);
    onChange(formatted);
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
      <input
        type="tel"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={field.placeholder || '(555) 123-4567'}
        required={field.required}
        maxLength={14}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '1rem',
          border: error ? '2px solid #dc3545' : '2px solid #e0e0e0',
          borderRadius: '6px',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => !error && (e.target.style.borderColor = '#D4AF37')}
        onBlur={(e) => !error && (e.target.style.borderColor = '#e0e0e0')}
      />
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

export default PhoneField;
