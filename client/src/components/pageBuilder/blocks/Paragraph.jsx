import React, { useState } from 'react';

function Paragraph({ text, styles, onUpdateProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(text || 'This is a paragraph. Double-click to edit.');

  const handleBlur = () => {
    setIsEditing(false);
    onUpdateProps({ text: content });
  };

  return (
    <p
      style={styles}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      onChange={(e) => setContent(e.target.textContent)}
    >
      {content}
    </p>
  );
}

export default Paragraph;
