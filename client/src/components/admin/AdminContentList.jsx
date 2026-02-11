import React from 'react';

const AdminContentList = ({ title, items, onEdit, onDelete, type }) => {
  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '20px', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{title}</h3>
      
      {items.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic', padding: '20px', textAlign: 'center' }}>No items found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
                        <th style={{ padding: '15px', color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' }}>Title</th>
                        <th style={{ padding: '15px', color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '15px', color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            {type === 'blog' ? 'Author' : 'Speaker'}
                        </th>
                        <th style={{ padding: '15px', color: '#888', fontSize: '0.85rem', textTransform: 'uppercase' }}>Date</th>
                        <th style={{ padding: '15px', color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr 
                            key={item._id} 
                            style={{ 
                                borderBottom: '1px solid #f9f9f9', 
                                transition: 'background 0.2s',
                                background: 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <td style={{ padding: '15px', fontWeight: '500', color: '#333' }}>{item.title}</td>
                            <td style={{ padding: '15px' }}>
                                <span style={{ 
                                    fontSize: '0.75rem', 
                                    padding: '4px 10px', 
                                    borderRadius: '20px', 
                                    background: item.isPublished ? '#e6fffa' : '#f0f0f0', 
                                    color: item.isPublished ? '#00796b' : '#666',
                                    border: `1px solid ${item.isPublished ? '#b2dfdb' : '#ddd'}`,
                                    fontWeight: '600'
                                }}>
                                    {item.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </td>
                            <td style={{ padding: '15px', color: '#666' }}>
                                {type === 'blog' ? item.author : item.speaker}
                            </td>
                            <td style={{ padding: '15px', color: '#888', fontSize: '0.9rem' }}>
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '15px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <a 
                                        href={type === 'blog' ? `/blog/${item.slug}` : `/sermons`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '6px 12px', 
                                            background: 'transparent', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '6px', 
                                            textDecoration: 'none',
                                            fontSize: '0.85rem',
                                            color: '#666',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#f5f5f5';
                                            e.currentTarget.style.borderColor = '#bbb';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = '#ddd';
                                        }}
                                    >
                                        View
                                    </a>
                                    <button 
                                        onClick={() => onEdit(item._id)}
                                        style={{ 
                                            padding: '6px 12px', 
                                            background: 'var(--light-bg)', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '6px', 
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            color: '#333',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#e8e8e8';
                                            e.currentTarget.style.borderColor = '#bbb';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'var(--light-bg)';
                                            e.currentTarget.style.borderColor = '#ddd';
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => onDelete(item._id)}
                                        style={{ 
                                            padding: '6px 12px', 
                                            background: '#fff0f0', 
                                            border: '1px solid #ffcccc', 
                                            borderRadius: '6px', 
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            color: '#d32f2f',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#ffe5e5';
                                            e.currentTarget.style.borderColor = '#ffaaaa';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#fff0f0';
                                            e.currentTarget.style.borderColor = '#ffcccc';
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default AdminContentList;
