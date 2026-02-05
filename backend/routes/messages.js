const express = require('express');
const router = express.Router();
const { authenticateToken, requireVerification } = require('../middleware/auth');
const { query } = require('../config/database');

// Get messages for a server
router.get('/server/:serverId', authenticateToken, async (req, res) => {
  try {
    const { serverId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Check if user is a member
    const memberCheck = await query(
      'SELECT id FROM server_members WHERE server_id = $1 AND user_id = $2',
      [serverId, req.user.id]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Must be a server member to view messages'
      });
    }

    const result = await query(
      `SELECT m.id, m.content, m.message_type, m.file_url, m.is_edited, m.created_at,
              u.id as user_id, u.name as user_name, u.role as user_role,
              p.profile_image
       FROM messages m
       JOIN users u ON m.user_id = u.id
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE m.server_id = $1 AND m.is_deleted = false
       ORDER BY m.created_at DESC
       LIMIT $2 OFFSET $3`,
      [serverId, limit, offset]
    );

    res.json({
      success: true,
      data: result.rows.reverse() // Return in chronological order
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
});

// Send message
router.post('/server/:serverId', authenticateToken, requireVerification, async (req, res) => {
  try {
    const { serverId } = req.params;
    const { content, messageType = 'text', fileUrl } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message content required'
      });
    }

    // Check if user is a member
    const memberCheck = await query(
      'SELECT id FROM server_members WHERE server_id = $1 AND user_id = $2',
      [serverId, req.user.id]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Must be a server member to send messages'
      });
    }

    const result = await query(
      `INSERT INTO messages (server_id, user_id, content, message_type, file_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [serverId, req.user.id, content, messageType, fileUrl]
    );

    // Update user contribution count
    await query(
      'UPDATE profiles SET total_contributions = total_contributions + 1 WHERE user_id = $1',
      [req.user.id]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// Edit message
router.put('/:messageId', authenticateToken, async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;

    const result = await query(
      `UPDATE messages
       SET content = $1, is_edited = true, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND user_id = $3 AND is_deleted = false
       RETURNING *`,
      [content, messageId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Message updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Edit message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to edit message'
    });
  }
});

// Delete message
router.delete('/:messageId', authenticateToken, async (req, res) => {
  try {
    const { messageId } = req.params;

    const result = await query(
      `UPDATE messages
       SET is_deleted = true, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [messageId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
});

module.exports = router;
