import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AdminSidebar />
      <main style={{ 
        marginLeft: '260px', 
        width: 'calc(100% - 260px)', 
        padding: '40px',
        marginTop: '72px' // Offset existing navbar if needed, but typically Admin has no top navbar or a different one. 
                           // Current public Navbar is fixed. We might want to hide public navbar on admin pages? 
                           // For now, let's assume we just push content down.
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
