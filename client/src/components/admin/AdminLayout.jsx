import React from 'react';
import AdminSidebar from './AdminSidebar';
import { useSidebar } from '../../context/SidebarContext';

const AdminLayout = ({ children, fullWidth = false }) => {
  const { sidebarWidth } = useSidebar();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AdminSidebar />
      <main style={{ 
        marginLeft: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        padding: fullWidth ? '0' : '40px',
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {fullWidth ? (
          children
        ) : (
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {children}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminLayout;
