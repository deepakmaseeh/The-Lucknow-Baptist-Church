import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear prev errors
    
    // Call API login
    const result = await login(username, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--beige-bg)' 
    }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
        maxWidth: '400px', 
        width: '100%',
        textAlign: 'center' 
      }}>
        <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Admin Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              fontSize: '1rem' 
            }}
            required
            autoComplete="username"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              fontSize: '1rem' 
            }}
            required
            autoComplete="current-password"
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          <button className="btn-gold" style={{ width: '100%' }}>LOGIN</button>
        </form>
        {/* Temporary Hint for Dev */}
        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#999' }}>
           (Make sure to create an admin user first via API or Seed)
        </p>
      </div>
    </div>
  );
}

export default Login;
