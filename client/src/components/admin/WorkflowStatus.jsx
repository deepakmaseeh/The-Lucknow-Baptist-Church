import React from 'react';

function WorkflowStatus({ state }) {
  const getStateConfig = (state) => {
    switch (state) {
      case 'draft':
        return { color: '#9e9e9e', bg: '#f5f5f5', icon: '📝', label: 'Draft' };
      case 'review':
        return { color: '#ff9800', bg: '#fff3e0', icon: '👀', label: 'In Review' };
      case 'approved':
        return { color: '#4caf50', bg: '#e8f5e9', icon: '✅', label: 'Approved' };
      case 'published':
        return { color: '#2196f3', bg: '#e3f2fd', icon: '🌐', label: 'Published' };
      case 'archived':
        return { color: '#757575', bg: '#eeeeee', icon: '📦', label: 'Archived' };
      default:
        return { color: '#9e9e9e', bg: '#f5f5f5', icon: '❓', label: 'Unknown' };
    }
  };

  const config = getStateConfig(state);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '20px',
      background: config.bg,
      color: config.color,
      fontSize: '0.85rem',
      fontWeight: '600',
      border: `1px solid ${config.color}40`
    }}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
}

export default WorkflowStatus;
