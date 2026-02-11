import React, { createContext, useState, useEffect, useContext } from 'react';
import { getApiUrl } from '../utils/api';

const SiteConfigContext = createContext(null);

export const SiteConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    siteName: 'The Lucknow Baptist Church',
    tagline: 'A Place to Belong',
    logoUrl: '',
    faviconUrl: '',
    theme: {
      primaryColor: '#D4AF37', // Default Gold
      secondaryColor: '#111111', // Default Dark
      backgroundColor: '#f4f1ea', // Default Beige
      fontHeading: 'Playfair Display',
      fontBody: 'Roboto'
    },
    contact: {
      address: '',
      phone: '',
      email: '',
      socialLinks: {}
    }
  });

  const [loading, setLoading] = useState(true);

  // Fetch Logic
  const fetchConfig = async () => {
    try {
      const response = await fetch(getApiUrl('/api/settings/public'));
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
        applyTheme(data.theme);
      }
    } catch (error) {
      console.error("Failed to load site config:", error);
    } finally {
      setLoading(false);
    }
  };

  // Live Style Injector
  const applyTheme = (theme) => {
    if (!theme) return;
    const root = document.documentElement;
    
    // Map DB fields to CSS Variables
    root.style.setProperty('--primary-color', theme.secondaryColor); // Text/Dark
    root.style.setProperty('--gold-color', theme.primaryColor); // Gold/Accent
    root.style.setProperty('--beige-bg', theme.backgroundColor);
    
    // Fonts
    root.style.setProperty('--font-heading', theme.fontHeading);
    root.style.setProperty('--font-main', theme.fontBody);
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading, refreshConfig: fetchConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
