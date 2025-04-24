// src/routes.js
import { lazy } from 'react';
import { PrivateRoute } from './components/PrivateRoute';

// Lazy load all page components
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

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/heritage-sites', element: <HeritageSites /> },
  { path: '/virtual-tours', element: <VirtualTours /> },
  { path: '/festivals', element: <Festivals /> },
  { path: '/art-forms', element: <ArtForms /> },
  { path: '/cuisine', element: <Cuisine /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/blog', element: <CulturalBlog /> },
  { path: '/blog/:id', element: <BlogPost /> }
];

export const authRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
];

export const protectedRoutes = [
  { 
    path: '/profile', 
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ) 
  }
];

export const fallbackRoute = {
  path: '*',
  element: <NotFound />
};