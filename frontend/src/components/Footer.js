import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaShieldAlt, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <FaGavel className="icon-gavel" />
                <FaShieldAlt className="icon-shield" />
              </div>
              <div className="logo-text">
                <span className="logo-title">Legal & Police</span>
                <span className="logo-subtitle">Global Network</span>
              </div>
            </div>
            <p className="footer-description">
              Connecting legal and law enforcement professionals worldwide for secure collaboration and knowledge sharing.
            </p>
            <div className="social-links">
              <a href="https://github.com/rahul700raj" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="mailto:rm2778643@gmail.com" className="social-link">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/network">Global Network</Link></li>
              <li><Link to="/servers">Servers</Link></li>
              <li><Link to="/resources">Resources</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li><Link to="/achievements">Achievements</Link></li>
              <li><a href="https://github.com/rahul700raj/legal-police-global-network" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              <li><a href="https://github.com/rahul700raj/legal-police-global-network/blob/main/README.md" target="_blank" rel="noopener noreferrer">API Reference</a></li>
              <li><Link to="/contact">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Legal & Police Global Network. All rights reserved.
          </p>
          <p className="developer">
            Built with ❤️ by <a href="https://github.com/rahul700raj" target="_blank" rel="noopener noreferrer">Rahul Mishra</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
