const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { query } = require('./config/database');

let wss;

const initWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws, req) => {
    console.log('New WebSocket connection');

    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        switch (data.type) {
          case 'auth':
            await handleAuth(ws, data);
            break;
          
          case 'join_server':
            await handleJoinServer(ws, data);
            break;
          
          case 'leave_server':
            handleLeaveServer(ws, data);
            break;
          
          case 'message':
            await handleMessage(ws, data);
            break;
          
          case 'typing':
            handleTyping(ws, data);
            break;
          
          default:
            ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      if (ws.userId && ws.serverId) {
        broadcastToServer(ws.serverId, {
          type: 'user_left',
          userId: ws.userId
        }, ws);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Heartbeat to detect broken connections
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });

  console.log('✅ WebSocket server initialized');
};

// Handle authentication
const handleAuth = async (ws, data) => {
  try {
    const { token } = data;
    
    if (!token) {
      ws.send(JSON.stringify({ type: 'auth_error', message: 'Token required' }));
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const result = await query(
      'SELECT id, name, role FROM users WHERE id = $1 AND is_active = true',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      ws.send(JSON.stringify({ type: 'auth_error', message: 'User not found' }));
      return;
    }

    ws.userId = result.rows[0].id;
    ws.userName = result.rows[0].name;
    ws.userRole = result.rows[0].role;
    ws.authenticated = true;

    ws.send(JSON.stringify({ 
      type: 'auth_success', 
      user: {
        id: ws.userId,
        name: ws.userName,
        role: ws.userRole
      }
    }));

  } catch (error) {
    console.error('Auth error:', error);
    ws.send(JSON.stringify({ type: 'auth_error', message: 'Authentication failed' }));
  }
};

// Handle joining a server
const handleJoinServer = async (ws, data) => {
  if (!ws.authenticated) {
    ws.send(JSON.stringify({ type: 'error', message: 'Not authenticated' }));
    return;
  }

  try {
    const { serverId } = data;

    // Verify user is a member
    const memberCheck = await query(
      'SELECT id FROM server_members WHERE server_id = $1 AND user_id = $2',
      [serverId, ws.userId]
    );

    if (memberCheck.rows.length === 0) {
      ws.send(JSON.stringify({ type: 'error', message: 'Not a member of this server' }));
      return;
    }

    ws.serverId = serverId;

    ws.send(JSON.stringify({ 
      type: 'joined_server', 
      serverId 
    }));

    // Notify others
    broadcastToServer(serverId, {
      type: 'user_joined',
      userId: ws.userId,
      userName: ws.userName
    }, ws);

  } catch (error) {
    console.error('Join server error:', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Failed to join server' }));
  }
};

// Handle leaving a server
const handleLeaveServer = (ws, data) => {
  if (ws.serverId) {
    broadcastToServer(ws.serverId, {
      type: 'user_left',
      userId: ws.userId,
      userName: ws.userName
    }, ws);
    
    ws.serverId = null;
    ws.send(JSON.stringify({ type: 'left_server' }));
  }
};

// Handle new message
const handleMessage = async (ws, data) => {
  if (!ws.authenticated || !ws.serverId) {
    ws.send(JSON.stringify({ type: 'error', message: 'Not authenticated or not in a server' }));
    return;
  }

  try {
    const { content, messageType = 'text', fileUrl } = data;

    // Save message to database
    const result = await query(
      `INSERT INTO messages (server_id, user_id, content, message_type, file_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [ws.serverId, ws.userId, content, messageType, fileUrl]
    );

    const messageData = {
      type: 'new_message',
      message: {
        id: result.rows[0].id,
        serverId: ws.serverId,
        userId: ws.userId,
        userName: ws.userName,
        userRole: ws.userRole,
        content,
        messageType,
        fileUrl,
        createdAt: result.rows[0].created_at
      }
    };

    // Broadcast to all users in the server
    broadcastToServer(ws.serverId, messageData);

  } catch (error) {
    console.error('Message error:', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Failed to send message' }));
  }
};

// Handle typing indicator
const handleTyping = (ws, data) => {
  if (!ws.authenticated || !ws.serverId) return;

  const { isTyping } = data;

  broadcastToServer(ws.serverId, {
    type: 'typing',
    userId: ws.userId,
    userName: ws.userName,
    isTyping
  }, ws);
};

// Broadcast message to all users in a server
const broadcastToServer = (serverId, data, excludeWs = null) => {
  wss.clients.forEach((client) => {
    if (
      client !== excludeWs &&
      client.readyState === WebSocket.OPEN &&
      client.serverId === serverId
    ) {
      client.send(JSON.stringify(data));
    }
  });
};

// Send notification to specific user
const sendNotificationToUser = (userId, notification) => {
  wss.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client.userId === userId
    ) {
      client.send(JSON.stringify({
        type: 'notification',
        notification
      }));
    }
  });
};

module.exports = {
  initWebSocket,
  sendNotificationToUser
};
