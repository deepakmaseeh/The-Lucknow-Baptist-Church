import React from 'react';

function ImageModal({ isOpen, imageSrc, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease' 
      }}
      onClick={onClose}
    >
      <button 
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '3rem',
          cursor: 'pointer',
          zIndex: 2001
        }}
        onClick={onClose}
      >
        &times;
      </button>

      <img 
        src={imageSrc} 
        alt="Full size" 
        style={{
          maxWidth: '90%',
          maxHeight: '90vh',
          borderRadius: '8px',
          boxShadow: '0 5px 30px rgba(0,0,0,0.5)',
          objectFit: 'contain'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      />
    </div>
  );
}

export default ImageModal;
