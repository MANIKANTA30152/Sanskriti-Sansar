import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, logoutLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/heritage-sites', name: 'Heritage Sites' },
    { path: '/virtual-tours', name: 'Virtual Tours' },
    { path: '/festivals', name: 'Festivals' },
    { path: '/art-forms', name: 'Art Forms' },
    { path: '/cuisine', name: 'Cuisine' },
    { path: '/about', name: 'About Us' }
  ];

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate('/login');
  };

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
          <div className="profile-dropdown">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDropdown}
            >
              <div className="profile-icon">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </motion.div>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <button 
                  onClick={handleLogout} 
                  className="dropdown-item"
                  disabled={logoutLoading}
                >
                  {logoutLoading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>
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