import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <div className="page-wrapper">
      {/* Reusing hero style but overriding height/image if needed, or just using a section */}
      <div className="section section-beige" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container text-center">
          <h1 className="hero-heading" style={{ color: 'var(--primary-color)', fontSize: '5rem', marginBottom: '1rem' }}>404</h1>
          <h2 className="section-title">Page Not Found</h2>
          <p className="intro-text" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="btn-group-center">
             <Link to="/" className="btn-gold">Return Home</Link>
             <Link to="/connect" className="btn-outline-dark" style={{color: 'var(--primary-color)', borderColor: 'var(--primary-color)'}}>Contact Us</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
