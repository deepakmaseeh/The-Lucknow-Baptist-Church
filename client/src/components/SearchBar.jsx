import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '500px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs and sermons..."
        style={{
          width: '100%',
          padding: '12px 45px 12px 18px',
          borderRadius: '25px',
          border: '2px solid #e0e0e0',
          fontSize: '0.95rem',
          outline: 'none',
          transition: 'border-color 0.3s'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--gold-color)'}
        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
      />
      <button
        type="submit"
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--gold-color)',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.1rem',
          transition: 'background 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#c9a961'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--gold-color)'}
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
