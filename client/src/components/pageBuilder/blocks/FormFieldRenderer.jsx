import React from 'react';
import TextField from './formFields/TextField';
import EmailField from './formFields/EmailField';
import PhoneField from './formFields/PhoneField';
import TextareaField from './formFields/TextareaField';
import SelectField from './formFields/SelectField';
import CheckboxField from './formFields/CheckboxField';
import RadioField from './formFields/RadioField';
import FileUploadField from './formFields/FileUploadField';

function FormFieldRenderer({ field, value, onChange, error }) {
  const fieldComponents = {
    text: TextField,
    email: EmailField,
    phone: PhoneField,
    textarea: TextareaField,
    select: SelectField,
    checkbox: CheckboxField,
    radio: RadioField,
    file: FileUploadField
  };

  const FieldComponent = fieldComponents[field.type];

  if (!FieldComponent) {
    return (
      <div style={{
        padding: '12px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '6px',
        marginBottom: '20px',
        color: '#856404'
      }}>
        Unknown field type: {field.type}
      </div>
    );
  }

  return (
    <FieldComponent
      field={field}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}

export default FormFieldRenderer;
