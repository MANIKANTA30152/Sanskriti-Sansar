import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Navbar.css';


function Navbar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/heritage-sites', name: 'Heritage Sites' },
    { path: '/virtual-tours', name: 'Virtual Tours' },
    { path: '/festivals', name: 'Festivals' },
    { path: '/art-forms', name: 'Art Forms' },
    { path: '/cuisine', name: 'Cuisine' },
    { path: '/about', name: 'About Us' }  // Added About Us link here
  
  ];

  return (
    <nav className="navbar">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="logo">Sanskriti Sansar</Link>
      </motion.div>
      
      <div className="nav-links">
        {navItems.map((item) => (
          <motion.div
            key={item.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.name}
            </Link>
          </motion.div>
        ))}

        {user ? (
          <>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                Profile
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button onClick={logout} className="nav-logout">
                Logout
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                Login
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>
                Register
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
