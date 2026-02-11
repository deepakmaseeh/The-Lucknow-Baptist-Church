import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ marginBottom: '10px', color: '#333' }}>Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Welcome back, {user?.username}!</p>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#888', textTransform: 'uppercase' }}>Total Views</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#333', margin: '10px 0 0' }}>1,245</p>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#888', textTransform: 'uppercase' }}>Sermons</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#333', margin: '10px 0 0' }}>42</p>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#888', textTransform: 'uppercase' }}>Blog Posts</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#333', margin: '10px 0 0' }}>15</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Activity</h3>
        <p style={{ color: '#888', fontStyle: 'italic' }}>No recent activity to show.</p>
      </div>
    </div>
  );
}

export default Dashboard;
