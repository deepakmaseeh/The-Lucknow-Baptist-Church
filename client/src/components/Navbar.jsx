import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';
import SearchBar from './SearchBar';
import logoImg from '../assets/images/logo.png';

function Navbar() {
  const { config } = useSiteConfig();
  const [isFloating, setIsFloating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isFloating ? 'navbar--floating' : ''}`}>
        <div className="navbar-content">
          <Link to="/" className="logo-container" onClick={() => setIsMenuOpen(false)}>
            {/* Dynamic Logo or Text */}
            <img 
              src={config?.logoUrl || logoImg} 
              alt={config?.siteName || 'The Lucknow Baptist Church'} 
              className="logo-img" 
              style={{ maxHeight: '50px', width: 'auto' }} 
            />
            
            {/* Always show text if no logo, or maybe side by side. For now side by side as per CSS */}
            <span className="logo-text">{config?.siteName || 'The Lucknow Baptist Church'}</span>
          </Link>
          
          <div className="hamburger" onClick={toggleMenu}>
             <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
             <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
             <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
          </div>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '400px', margin: '0 30px', display: window.innerWidth > 768 ? 'block' : 'none' }}>
            <SearchBar />
          </div>

          <ul className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
            <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={toggleMenu}>About</NavLink></li>
            <li><NavLink to="/connect" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={toggleMenu}>Connect</NavLink></li>
            <li><NavLink to="/events" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={toggleMenu}>Events</NavLink></li>
            <li><NavLink to="/sermons" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={toggleMenu}>Sermons</NavLink></li>
            <li><NavLink to="/blog" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={toggleMenu}>Blog</NavLink></li>
            <li><NavLink to="/new" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={toggleMenu}>I'm New</NavLink></li>
            <li><Link to="/give" className="btn-give" onClick={toggleMenu}>Give</Link></li>
          </ul>
        </div>
      </nav>
      {isFloating && <div style={{ height: '72px' }}></div>}
    </>
  );
}

export default Navbar;
