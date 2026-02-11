import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: isActive ? 'var(--gold-color)' : '#ccc',
    textDecoration: 'none',
    borderLeft: isActive ? '4px solid var(--gold-color)' : '4px solid transparent',
    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    fontWeight: isActive ? '600' : '400',
    gap: '10px'
  });

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      background: '#1a1a1a',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #333',
      zIndex: 1000
    }}>
      {/* Brand */}
      <div style={{ padding: '25px', borderBottom: '1px solid #333' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>
          CMS Admin
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>Manage Your Church</p>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <NavLink to="/admin/dashboard" style={linkStyle} end>
          <span>📊</span> Dashboard
        </NavLink>
        
        <div style={{ padding: '15px 20px 5px', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Content
        </div>
        <NavLink to="/admin/blogs/new" style={linkStyle}>
          <span>📝</span> Write Blog
        </NavLink>
        <NavLink to="/admin/sermons/new" style={linkStyle}>
          <span>🎥</span> Add Sermon
        </NavLink>
        
        <div style={{ padding: '15px 20px 5px', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Design
        </div>
        <NavLink to="/admin/appearance" style={linkStyle}>
          <span>🎨</span> Appearance
        </NavLink>
      </nav>

      {/* User / Logout */}
      <div style={{ padding: '20px', borderTop: '1px solid #333' }}>
        <button 
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid #444',
            color: '#ccc',
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: '0.2s'
          }}
          onMouseOver={(e) => { e.target.style.borderColor = 'red'; e.target.style.color = 'red'; }}
          onMouseOut={(e) => { e.target.style.borderColor = '#444'; e.target.style.color = '#ccc'; }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
