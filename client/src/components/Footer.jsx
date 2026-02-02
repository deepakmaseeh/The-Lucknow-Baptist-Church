import React, { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      // Simulate API call
      setTimeout(() => setSubscribed(true), 500);
    }
  };

  return (
    <footer className="connect-footer" style={{ padding: '30px 0 20px' }}>
      <div className="container">
        {/* Newsletter Section - Condensed */}
        <div style={{ maxWidth: '800px', margin: '0 auto 20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
           <h4 style={{ margin: 0, color: 'white' }}>Stay Updated:</h4>
           {subscribed ? (
             <span style={{ color: 'var(--gold-color)', fontWeight: 'bold' }}>Thanks for subscribing! 🎉</span>
           ) : (
             <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }}>
               <input 
                 type="email" 
                 placeholder="Enter email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', width: '200px', fontSize: '0.9rem' }}
                 required
               />
               <button type="submit" className="btn-gold" style={{ border: 'none', margin: '0', padding: '8px 15px', fontSize: '0.9rem' }}>Subscribe</button>
             </form>
           )}
        </div>

        {/* Compact Info Row */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', color: '#ccc', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📧</span> <span>info@lucknowbaptistchurch.org</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span>📞</span> <span>(608) 781-2466</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span>📍</span> <span>Lucknow, Uttar Pradesh, India</span>
          </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span>💳</span> <span style={{ color: 'var(--gold-color)', cursor: 'pointer' }}>Give Online</span>
          </div>
        </div>

        <div className="footer-bottom" style={{ marginTop: '20px', paddingTop: '10px', borderTop: 'none' }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>&copy; 2026 The Lucknow Baptist Church</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
