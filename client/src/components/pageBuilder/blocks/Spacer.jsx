import React from 'react';

function Spacer({ height, styles }) {
  return (
    <div style={{
      ...styles,
      height: height || styles.height || '40px',
      background: 'transparent'
    }} />
  );
}

export default Spacer;
