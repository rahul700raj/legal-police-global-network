// Server Chat Page - Real-time chat interface
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServerChat = () => {
  const { serverId } = useParams();

  return (
    <div className="server-chat-page">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1>Server Chat</h1>
          <p>Real-time chat for server {serverId} - To be implemented</p>
          {/* TODO: WebSocket connection */}
          {/* TODO: Message list with pagination */}
          {/* TODO: Message input with send button */}
          {/* TODO: Typing indicators */}
          {/* TODO: Member list sidebar */}
        </motion.div>
      </div>
    </div>
  );
};

export default ServerChat;
