import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar, sidebarWidth } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? '10px' : '10px 16px',
    color: isActive ? 'var(--gold-color)' : '#ccc',
    textDecoration: 'none',
    borderLeft: isActive ? '3px solid var(--gold-color)' : '3px solid transparent',
    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    transition: 'all 0.2s ease',
    fontSize: '0.9rem',
    fontWeight: isActive ? '600' : '400',
    gap: '10px',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    position: 'relative'
  });

  const NavItem = ({ to, icon, label, end }) => (
    <NavLink 
      to={to} 
      style={linkStyle} 
      end={end}
      title={isCollapsed ? label : ''}
    >
      <span style={{ fontSize: '1.1rem', minWidth: '18px', textAlign: 'center' }}>{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );

  const SectionHeader = ({ label }) => {
    if (isCollapsed) return null;
    return (
      <div style={{ 
        padding: '14px 16px 6px', 
        fontSize: '0.65rem', 
        color: '#666', 
        textTransform: 'uppercase', 
        letterSpacing: '1.2px', 
        fontWeight: 'bold' 
      }}>
        {label}
      </div>
    );
  };

  return (
    <div className="glass-sidebar" style={{
      width: `${sidebarWidth}px`,
      height: '100vh',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowX: 'hidden',
      overflowY: 'auto'
    }}>
      {/* Toggle Button */}
      <div style={{ 
        padding: isCollapsed ? '15px 10px' : '15px 20px', 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between'
      }}>
        {!isCollapsed && (
          <div>
            <h2 style={{ fontSize: '1.2rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>
              CMS Admin
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px', marginBottom: 0 }}>
              Manage Your Church
            </p>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.2s',
            flexShrink: 0
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gold-color)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? '☰' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <NavItem to="/admin/dashboard" icon="📊" label="Dashboard" end />
        <NavItem to="/admin/analytics" icon="📈" label="Analytics" />
        <NavItem to="/admin/pages" icon="🎨" label="Page Builder" />
        
        <SectionHeader label="Content Management" />
        <NavItem to="/admin/blogs/new" icon="📝" label="Write Blog" />
        <NavItem to="/admin/sermons/new" icon="🎥" label="Add Sermon" />
        <NavItem to="/admin/series" icon="📚" label="Series" />
        
        <SectionHeader label="Settings" />
        <NavItem to="/admin/podcast" icon="🎙️" label="Podcast" />
        <NavItem to="/admin/appearance" icon="🎨" label="Appearance" />

        <div style={{ marginTop: 'auto', padding: isCollapsed ? '10px' : '20px' }}>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: isCollapsed ? '12px' : '12px',
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              flexDirection: isCollapsed ? 'column' : 'row'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            title="View Live Site"
          >
            <span>🌐</span>
            {!isCollapsed && <span>View Live Site</span>}
          </a>
        </div>
      </nav>

      {/* User / Logout */}
      <div style={{ 
        padding: isCollapsed ? '15px 10px' : '20px', 
        borderTop: '1px solid #333', 
        background: 'rgba(0,0,0,0.2)' 
      }}>
        {!isCollapsed && (
          <div style={{ marginBottom: '15px', padding: '0 5px' }}>
            <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: '600' }}>Admin Account</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Logged in</div>
          </div>
        )}
        <button 
          onClick={handleLogout}
          style={{
            background: '#333',
            border: 'none',
            color: '#fff',
            width: '100%',
            padding: isCollapsed ? '12px' : '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: '0.2s',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexDirection: isCollapsed ? 'column' : 'row'
          }}
          onMouseOver={(e) => { e.target.style.background = '#d32f2f'; }}
          onMouseOut={(e) => { e.target.style.background = '#333'; }}
          title={isCollapsed ? 'Logout' : ''}
        >
          <span>🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
