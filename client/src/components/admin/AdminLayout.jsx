import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AdminSidebar />
      <main style={{ 
        marginLeft: '260px', 
        width: 'calc(100% - 260px)', 
        padding: '40px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
