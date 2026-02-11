import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteConfigProvider } from './context/SiteConfigContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Connect from './pages/Connect';
import Events from './pages/Events';
import FirstVisit from './pages/FirstVisit';
import Give from './pages/Give';
import Sermons from './pages/Sermons'; 
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageSermons from './pages/admin/ManageSermons';

import AdminLayout from './components/admin/AdminLayout';
import Appearance from './pages/admin/Appearance';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <SiteConfigProvider>
        <Router>
          <ScrollToTop />
          <BackToTop />
          <div className="app-container">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/events" element={<Events />} />
              <Route path="/sermons" element={<Sermons />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/new" element={<FirstVisit />} />
              <Route path="/give" element={<Give />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              
              {/* Protected Admin Pages (Wrapped in Layout) */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <Dashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/blogs/new" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <ManageBlogs />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/sermons/new" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <ManageSermons />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/appearance" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <Appearance />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </SiteConfigProvider>
    </AuthProvider>
  );
}

export default App;
