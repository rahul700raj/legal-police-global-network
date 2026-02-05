import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="contact-content"
        >
          <h1>Contact Us</h1>
          <p className="lead">Have questions? We'd love to hear from you.</p>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <FaEnvelope />
                <h3>Email</h3>
                <p>rm2778643@gmail.com</p>
              </div>
              <div className="info-card">
                <FaPhone />
                <h3>Support</h3>
                <p>24/7 Support Available</p>
              </div>
              <div className="info-card">
                <FaMapMarkerAlt />
                <h3>Location</h3>
                <p>Global Network</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form card">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
