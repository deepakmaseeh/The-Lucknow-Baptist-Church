import React, { useState } from 'react';

function Button({ text, link, styles, onUpdateProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(text || 'Button Text');

  const handleBlur = () => {
    setIsEditing(false);
    onUpdateProps({ text: content, link });
  };

  return (
    <button
      style={styles}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      onChange={(e) => setContent(e.target.textContent)}
    >
      {content}
    </button>
  );
}

export default Button;
