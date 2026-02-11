import React, { useState } from 'react';

const TagInput = ({ tags = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag on backspace if input is empty
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '8px',
      minHeight: '45px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      alignItems: 'center',
      background: 'white'
    }}>
      {tags.map((tag, index) => (
        <span 
          key={index}
          style={{
            background: 'var(--gold-color)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              padding: '0',
              lineHeight: 1,
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Type a tag and press Enter" : ""}
        style={{
          border: 'none',
          outline: 'none',
          flex: 1,
          minWidth: '120px',
          fontSize: '0.95rem',
          padding: '4px'
        }}
      />
    </div>
  );
};

export default TagInput;
