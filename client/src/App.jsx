import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { SidebarProvider } from './context/SidebarContext';
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
import BlogPost from './pages/BlogPost';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageSermons from './pages/admin/ManageSermons';
import ManageSeries from './pages/admin/ManageSeries';
import PodcastSettings from './pages/admin/PodcastSettings';

import AdminLayout from './components/admin/AdminLayout';
import Appearance from './pages/admin/Appearance';
import Analytics from './pages/admin/Analytics';
import PageBuilder from './pages/admin/PageBuilder';

import './index.css';

import PublicLayout from './components/PublicLayout';

// ... imports remain the same

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <SiteConfigProvider>
          <SidebarProvider>
            <Router>
              <ScrollToTop />
              <BackToTop />
          <div className="app-container">
            <Routes>
              {/* Public Routes (Wrapped in Navbar) */}
              <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/connect" element={<Connect />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/sermons" element={<Sermons />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/new" element={<FirstVisit />} />
                  <Route path="/new" element={<FirstVisit />} />
                  <Route path="/give" element={<Give />} />
              </Route>
              
              {/* Admin Routes (No Navbar) */}
              <Route path="/admin/login" element={<Login />} />
              
              {/* Protected Admin Pages (Wrapped in AdminLayout) */}
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
                path="/admin/blogs/edit/:id" 
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
                path="/admin/sermons/edit/:id" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <ManageSermons />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/series" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <ManageSeries />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/series/edit/:id" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <ManageSeries />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/podcast" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <PodcastSettings />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/analytics" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <Analytics />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/pages" 
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                        <PageBuilder />
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
      </SidebarProvider>
      </SiteConfigProvider>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
