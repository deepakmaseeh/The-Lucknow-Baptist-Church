import React from 'react';

function Divider({ styles }) {
  return (
    <hr style={{
      ...styles,
      border: 'none',
      height: '1px',
      backgroundColor: styles.backgroundColor || '#e0e0e0',
      margin: styles.margin || '30px 0'
    }} />
  );
}

export default Divider;
