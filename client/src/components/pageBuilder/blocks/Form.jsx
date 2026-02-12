import React, { useState } from 'react';
import FormFieldRenderer from './FormFieldRenderer';
import { getApiUrl } from '../../../utils/api';

function Form({ props, styles }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    props.fields?.forEach(field => {
      const value = formData[field.id];

      // Required field validation
      if (field.required && !value) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }

      // Email validation
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }

      // Min/Max length validation
      if (field.validation?.minLength && value && value.length < field.validation.minLength) {
        newErrors[field.id] = `Minimum ${field.validation.minLength} characters required`;
      }
      if (field.validation?.maxLength && value && value.length > field.validation.maxLength) {
        newErrors[field.id] = `Maximum ${field.validation.maxLength} characters allowed`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: 'Please fix the errors above and try again.'
      });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`${getApiUrl()}/api/forms/${props.formId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: props.successMessage || 'Thank you! Your submission has been received.'
        });
        setFormData({});
        setErrors({});
      } else {
        const errorData = await response.json();
        setMessage({
          type: 'error',
          text: errorData.error || props.errorMessage || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage({
        type: 'error',
        text: props.errorMessage || 'Something went wrong. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px',
        ...styles
      }}
    >
      {props.title && (
        <h2 style={{
          marginBottom: '24px',
          fontSize: '1.8rem',
          fontWeight: '700',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          {props.title}
        </h2>
      )}

      {props.description && (
        <p style={{
          marginBottom: '32px',
          fontSize: '1rem',
          color: '#666',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          {props.description}
        </p>
      )}

      {props.fields?.map(field => (
        <FormFieldRenderer
          key={field.id}
          field={field}
          value={formData[field.id] || ''}
          onChange={(value) => handleFieldChange(field.id, value)}
          error={errors[field.id]}
        />
      ))}

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          padding: '14px 24px',
          fontSize: '1.05rem',
          fontWeight: '600',
          color: 'white',
          background: submitting
            ? 'linear-gradient(135deg, #999 0%, #777 100%)'
            : 'linear-gradient(135deg, #D4AF37 0%, #C9A532 100%)',
          border: 'none',
          borderRadius: '6px',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          boxShadow: submitting ? 'none' : '0 4px 12px rgba(212, 175, 55, 0.3)',
          marginTop: '12px'
        }}
        onMouseEnter={(e) => {
          if (!submitting) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!submitting) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
          }
        }}
      >
        {submitting ? 'Sending...' : (props.submitButtonText || 'Submit')}
      </button>

      {message && (
        <div
          style={{
            marginTop: '24px',
            padding: '16px 20px',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontWeight: '500',
            textAlign: 'center',
            background: message.type === 'success'
              ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)'
              : 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `2px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}
        >
          {message.type === 'success' ? '✓ ' : '⚠ '}
          {message.text}
        </div>
      )}
    </form>
  );
}

export default Form;
