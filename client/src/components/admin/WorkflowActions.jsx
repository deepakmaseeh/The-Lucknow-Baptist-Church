import React, { useState } from 'react';
import { getApiUrl } from '../../utils/api';

function WorkflowActions({ contentType, contentId, currentState, onStateChange }) {
  const [loading, setLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleAction = async (action, comment = '') => {
    setLoading(true);
    try {
      const response = await fetch(
        getApiUrl(`/api/workflow/${contentType}/${contentId}/${action}`),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ comment })
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        if (onStateChange) onStateChange(data.content.workflowState);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Action failed'}`);
      }
    } catch (error) {
      console.error('Workflow action error:', error);
      alert('Error performing action');
    } finally {
      setLoading(false);
      setShowRejectModal(false);
      setRejectReason('');
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    handleAction('reject', rejectReason);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {currentState === 'draft' && (
        <button
          onClick={() => handleAction('submit')}
          disabled={loading}
          style={{
            padding: '8px 16px',
            background: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          📤 Submit for Review
        </button>
      )}

      {currentState === 'review' && (
        <>
          <button
            onClick={() => handleAction('approve')}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            ✅ Approve
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            ❌ Reject
          </button>
        </>
      )}

      {currentState === 'approved' && (
        <button
          onClick={() => handleAction('publish')}
          disabled={loading}
          style={{
            padding: '8px 16px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          🌐 Publish
        </button>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div style={{
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
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '20px' }}>Reject Content</h3>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Reason for Rejection:
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason..."
              rows="4"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                marginBottom: '20px'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowRejectModal(false)}
                style={{
                  padding: '10px 20px',
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                style={{
                  padding: '10px 20px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkflowActions;
