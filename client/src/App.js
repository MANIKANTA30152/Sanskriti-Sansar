// src/App.js
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import { PrivateRoute } from './components/PrivateRoute';
import './App.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const HeritageSites = lazy(() => import('./pages/HeritageSites'));
const VirtualTours = lazy(() => import('./pages/VirtualTours'));
const Festivals = lazy(() => import('./pages/Festivals'));
const ArtForms = lazy(() => import('./pages/ArtForms'));
const Cuisine = lazy(() => import('./pages/Cuisine'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const CulturalBlog = lazy(() => import('./pages/CulturalBlog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/heritage-sites" element={<HeritageSites />} />
            <Route path="/virtual-tours" element={<VirtualTours />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/art-forms" element={<ArtForms />} />
            <Route path="/cuisine" element={<Cuisine />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<CulturalBlog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;