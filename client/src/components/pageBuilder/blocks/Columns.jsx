import React from 'react';

function Columns({ count, styles }) {
  const columnCount = count || 2;
  const columns = Array.from({ length: columnCount }, (_, i) => i);

  return (
    <div style={{
      ...styles,
      display: 'grid',
      gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
      gap: styles.gap || '20px'
    }}>
      {columns.map((_, index) => (
        <div
          key={index}
          style={{
            padding: '20px',
            background: '#f9f9f9',
            border: '1px dashed #ddd',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}
        >
          Column {index + 1}
        </div>
      ))}
    </div>
  );
}

export default Columns;
