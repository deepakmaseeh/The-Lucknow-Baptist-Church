import React, { useState } from 'react';

function Heading({ text, tag, styles, onUpdateProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(text || 'Heading Text');
  const Tag = tag || 'h2';

  const handleBlur = () => {
    setIsEditing(false);
    onUpdateProps({ text: content, tag });
  };

  return (
    <Tag
      style={styles}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      onChange={(e) => setContent(e.target.textContent)}
    >
      {content}
    </Tag>
  );
}

export default Heading;
