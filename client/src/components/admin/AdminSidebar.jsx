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
        
        <div style={{ padding: '20px 20px 10px', fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>
          Content Management
        </div>
        <NavLink to="/admin/blogs/new" style={linkStyle}>
          <span>📝</span> Write Blog
        </NavLink>
        <NavLink to="/admin/sermons/new" style={linkStyle}>
          <span>🎥</span> Add Sermon
        </NavLink>
        <NavLink to="/admin/series" style={linkStyle}>
          <span>📚</span> Series
        </NavLink>
        
        <div style={{ padding: '20px 20px 10px', fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>
          Settings
        </div>
        <NavLink to="/admin/appearance" style={linkStyle}>
          <span>🎨</span> Appearance
        </NavLink>

        <div style={{ marginTop: 'auto', padding: '20px' }}>
             <a href="/" target="_blank" rel="noopener noreferrer" style={{
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '8px',
                 padding: '12px',
                 width: '100%',
                 background: 'rgba(255,255,255,0.1)',
                 color: 'white',
                 textDecoration: 'none',
                 borderRadius: '8px',
                 fontSize: '0.9rem',
                 border: '1px solid rgba(255,255,255,0.1)',
                 transition: 'all 0.3s ease'
             }}
             onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
             onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
             >
                 <span>🌐</span> View Live Site
             </a>
        </div>
      </nav>

      {/* User / Logout */}
      <div style={{ padding: '20px', borderTop: '1px solid #333', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ marginBottom: '15px', padding: '0 5px' }}>
            <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: '600' }}>Admin Account</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Logged in</div>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            background: '#333',
            border: 'none',
            color: '#fff',
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: '0.2s',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => { e.target.style.background = '#d32f2f'; }}
          onMouseOut={(e) => { e.target.style.background = '#333'; }}
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
