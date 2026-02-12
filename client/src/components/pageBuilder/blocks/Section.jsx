import React from 'react';

function Section({ styles, children }) {
  return (
    <section style={styles}>
      {children || (
        <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          Section - Drop blocks here or add content
        </div>
      )}
    </section>
  );
}

export default Section;
