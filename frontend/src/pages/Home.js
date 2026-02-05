import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobe, FaShieldAlt, FaUsers, FaTrophy, FaLock, FaComments } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FaGlobe />,
      title: 'Global Network',
      description: 'Connect with legal and law enforcement professionals from over 150 countries worldwide'
    },
    {
      icon: <FaLock />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with role-based access and verified user badges'
    },
    {
      icon: <FaComments />,
      title: 'Real-time Collaboration',
      description: 'Instant messaging, discussion servers, and knowledge sharing in real-time'
    },
    {
      icon: <FaUsers />,
      title: 'Professional Community',
      description: 'Join verified lawyers and police officers in meaningful discussions'
    },
    {
      icon: <FaTrophy />,
      title: 'Achievement System',
      description: 'Earn badges, reputation points, and recognition for your contributions'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Verified Profiles',
      description: 'All members undergo verification to ensure authenticity and professionalism'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Members' },
    { number: '150+', label: 'Countries' },
    { number: '50+', label: 'Discussion Servers' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Global Network for
              <span className="gradient-text"> Legal & Law Enforcement</span>
              <br />Professionals
            </h1>
            <p className="hero-subtitle">
              Connect, collaborate, and share knowledge with verified lawyers and police officers worldwide. 
              Join the most trusted professional network for legal and law enforcement communities.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                Join Network
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-card card-1">
              <FaGlobe className="card-icon" />
              <span>Global Reach</span>
            </div>
            <div className="floating-card card-2">
              <FaShieldAlt className="card-icon" />
              <span>Verified Users</span>
            </div>
            <div className="floating-card card-3">
              <FaUsers className="card-icon" />
              <span>10K+ Members</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Join Our Network?</h2>
            <p className="section-subtitle">
              Everything you need to connect, collaborate, and grow professionally
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Ready to Join the Global Network?</h2>
            <p className="cta-subtitle">
              Connect with thousands of legal and law enforcement professionals worldwide
            </p>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
