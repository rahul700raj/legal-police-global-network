import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="about-content"
        >
          <h1>About Legal & Police Global Network</h1>
          <p className="lead">
            Connecting legal and law enforcement professionals worldwide for secure collaboration and knowledge sharing.
          </p>
          
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              To create a secure, professional platform where lawyers and police officers from around the world
              can connect, collaborate, and share knowledge to advance justice and law enforcement globally.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <ul>
              <li>Secure, verified professional network</li>
              <li>Real-time collaboration tools</li>
              <li>Knowledge sharing and resources</li>
              <li>Global community of legal and law enforcement professionals</li>
              <li>Achievement and recognition system</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Security:</strong> Your data and communications are protected</li>
              <li><strong>Professionalism:</strong> Verified members only</li>
              <li><strong>Collaboration:</strong> Breaking down geographical barriers</li>
              <li><strong>Knowledge:</strong> Sharing expertise for the greater good</li>
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
