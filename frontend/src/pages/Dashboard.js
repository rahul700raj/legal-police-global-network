import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaServer, FaBook, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const quickStats = [
    { icon: <FaUsers />, label: 'Network Members', value: '10,000+', link: '/network' },
    { icon: <FaServer />, label: 'Active Servers', value: '50+', link: '/servers' },
    { icon: <FaBook />, label: 'Resources', value: '500+', link: '/resources' },
    { icon: <FaTrophy />, label: 'Your Points', value: user?.reputation_points || 0, link: '/achievements' }
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="dashboard-header">
            <h1>Welcome back, {user?.name}!</h1>
            <p>Here's what's happening in your network</p>
          </div>

          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <Link to={stat.link} key={index} className="stat-card card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="dashboard-actions">
            <Link to="/servers" className="btn btn-primary">
              Join a Server
            </Link>
            <Link to="/resources" className="btn btn-secondary">
              Browse Resources
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
