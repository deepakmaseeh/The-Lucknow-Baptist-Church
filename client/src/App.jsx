import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Connect from './pages/Connect';
import Events from './pages/Events';
import FirstVisit from './pages/FirstVisit';
import Give from './pages/Give';
import Sermons from './pages/Sermons'; 
import Blog from './pages/Blog'; // New Blog Page
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageSermons from './pages/admin/ManageSermons';

import './index.css';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <Router>
      <AuthProvider>
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
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blogs/new" 
              element={
                <ProtectedRoute>
                  <ManageBlogs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/sermons/new" 
              element={
                <ProtectedRoute>
                  <ManageSermons />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
