// Servers Page - List all discussion servers
import React from 'react';
import { motion } from 'framer-motion';

const Servers = () => {
  return (
    <div className="servers-page">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1>Discussion Servers</h1>
          <p>Browse and join discussion servers - To be implemented</p>
          {/* TODO: Fetch servers from API */}
          {/* TODO: Add region and category filters */}
          {/* TODO: Add server cards with join buttons */}
          {/* TODO: Show member counts */}
        </motion.div>
      </div>
    </div>
  );
};

export default Servers;
