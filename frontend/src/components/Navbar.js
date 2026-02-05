import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGavel, FaShieldAlt, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isAuthenticated ? [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/network', label: 'Global Network' },
    { path: '/servers', label: 'Servers' },
    { path: '/resources', label: 'Resources' },
    { path: '/achievements', label: 'Achievements' },
  ] : [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <motion.div
            className="logo-icon"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaGavel className="icon-gavel" />
            <FaShieldAlt className="icon-shield" />
          </motion.div>
          <div className="logo-text">
            <span className="logo-title">Legal & Police</span>
            <span className="logo-subtitle">Global Network</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Menu / Auth Buttons */}
        <div className="navbar-actions desktop">
          {isAuthenticated ? (
            <div className="user-menu-container">
              <button 
                className="user-menu-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {user?.profile_image ? (
                    <img src={user.profile_image} alt={user.name} />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <span>{user?.name}</span>
              </button>
              
              {showUserMenu && (
                <motion.div 
                  className="user-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Link to={`/profile/${user?.id}`} className="dropdown-item">
                    <FaUser /> My Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="dropdown-item">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FaSignOutAlt /> Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Join Network</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Link 
                to={`/profile/${user?.id}`} 
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <button 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }} 
                className="mobile-nav-link logout"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="btn btn-outline" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                Join Network
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
