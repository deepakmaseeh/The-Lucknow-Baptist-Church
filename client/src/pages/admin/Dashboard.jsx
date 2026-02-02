import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--light-bg)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
           <h1>Admin Dashboard</h1>
           <button onClick={handleLogout} className="btn-outline-dark">Logout</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
           {/* Card 1: Blog */}
           <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <h3>Manage Blogs</h3>
              <p style={{ color: '#777', marginBottom: '20px' }}>Write new articles or edit existing ones.</p>
              <Link to="/admin/blogs/new" className="btn-gold">Create New Post</Link>
           </div>

           {/* Card 2: Sermons */}
           <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <h3>Manage Sermons</h3>
              <p style={{ color: '#777', marginBottom: '20px' }}>Upload new sermon links and details.</p>
              <Link to="/admin/sermons/new" className="btn-gold">Add New Sermon</Link>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
