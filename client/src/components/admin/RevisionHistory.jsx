import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../../utils/api';

function RevisionHistory({ contentType, contentId, onRestore }) {
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRevision, setSelectedRevision] = useState(null);

  useEffect(() => {
    fetchRevisions();
  }, [contentType, contentId]);

  const fetchRevisions = async () => {
    try {
      const response = await fetch(
        getApiUrl(`/api/revisions/${contentType}/${contentId}`),
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await response.json();
      setRevisions(data);
    } catch (error) {
      console.error('Error fetching revisions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (revisionId) => {
    if (!window.confirm('Are you sure you want to restore to this version? This will create a new revision.')) {
      return;
    }

    try {
      const response = await fetch(
        getApiUrl(`/api/revisions/${revisionId}/restore`),
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(`Successfully restored to version ${data.newVersion}`);
        if (onRestore) onRestore();
        fetchRevisions();
      } else {
        alert('Failed to restore revision');
      }
    } catch (error) {
      console.error('Error restoring revision:', error);
      alert('Error restoring revision');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading revision history...</div>;
  }

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>
        📜 Revision History ({revisions.length} versions)
      </h3>

      {revisions.length === 0 ? (
        <p style={{ color: '#888' }}>No revision history available yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {revisions.map((revision) => (
            <div
              key={revision._id}
              style={{
                background: 'white',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span style={{
                    background: 'var(--gold-color)',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    v{revision.version}
                  </span>
                  <span style={{
                    background: getChangeTypeColor(revision.changeType),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    {revision.changeType}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                  {revision.changesSummary || 'No description'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                  {formatDate(revision.createdAt)} • 
                  {revision.changedBy ? ` by ${revision.changedBy.username || revision.changedBy.email}` : ' Unknown user'}
                </div>
                {revision.fieldsChanged && revision.fieldsChanged.length > 0 && (
                  <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>
                    <strong>Changed fields:</strong> {revision.fieldsChanged.map(f => f.field).join(', ')}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedRevision(revision)}
                  style={{
                    padding: '6px 12px',
                    background: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => handleRestore(revision._id)}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--gold-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revision Detail Modal */}
      {selectedRevision && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setSelectedRevision(null)}
        >
          <div
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              maxWidth: '800px',
              maxHeight: '80vh',
              overflow: 'auto',
              width: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: '20px' }}>Revision v{selectedRevision.version} Details</h3>
            <pre style={{
              background: '#f5f5f5',
              padding: '15px',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.85rem'
            }}>
              {JSON.stringify(selectedRevision.data, null, 2)}
            </pre>
            <button
              onClick={() => setSelectedRevision(null)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getChangeTypeColor(type) {
  switch (type) {
    case 'created': return '#4caf50';
    case 'updated': return '#2196f3';
    case 'restored': return '#ff9800';
    case 'published': return '#9c27b0';
    case 'unpublished': return '#f44336';
    default: return '#757575';
  }
}

export default RevisionHistory;
