const express = require('express');
const router = express.Router();
const { authenticateToken, requireVerification } = require('../middleware/auth');
const { query } = require('../config/database');

// Get all servers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { region, category } = req.query;

    let queryText = `
      SELECT s.*, 
             (SELECT COUNT(*) FROM server_members WHERE server_id = s.id) as member_count
      FROM servers s
      WHERE s.is_active = true
    `;
    const params = [];
    let paramCount = 1;

    if (region && region !== 'all') {
      queryText += ` AND s.region = $${paramCount}`;
      params.push(region);
      paramCount++;
    }

    if (category) {
      queryText += ` AND s.category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    queryText += ' ORDER BY member_count DESC';

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get servers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch servers'
    });
  }
});

// Get server details
router.get('/:serverId', authenticateToken, async (req, res) => {
  try {
    const { serverId } = req.params;

    const serverResult = await query(
      `SELECT s.*, 
              (SELECT COUNT(*) FROM server_members WHERE server_id = s.id) as member_count,
              (SELECT COUNT(*) FROM server_members WHERE server_id = s.id AND user_id = $1) as is_member
       FROM servers s
       WHERE s.id = $2`,
      [req.user.id, serverId]
    );

    if (serverResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Server not found'
      });
    }

    res.json({
      success: true,
      data: serverResult.rows[0]
    });

  } catch (error) {
    console.error('Get server error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch server'
    });
  }
});

// Join server
router.post('/:serverId/join', authenticateToken, requireVerification, async (req, res) => {
  try {
    const { serverId } = req.params;

    // Check if already a member
    const existing = await query(
      'SELECT id FROM server_members WHERE server_id = $1 AND user_id = $2',
      [serverId, req.user.id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Already a member of this server'
      });
    }

    // Join server
    await query(
      'INSERT INTO server_members (server_id, user_id) VALUES ($1, $2)',
      [serverId, req.user.id]
    );

    // Update member count
    await query(
      'UPDATE servers SET member_count = member_count + 1 WHERE id = $1',
      [serverId]
    );

    res.json({
      success: true,
      message: 'Successfully joined server'
    });

  } catch (error) {
    console.error('Join server error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to join server'
    });
  }
});

// Leave server
router.post('/:serverId/leave', authenticateToken, async (req, res) => {
  try {
    const { serverId } = req.params;

    const result = await query(
      'DELETE FROM server_members WHERE server_id = $1 AND user_id = $2 RETURNING id',
      [serverId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Not a member of this server'
      });
    }

    // Update member count
    await query(
      'UPDATE servers SET member_count = GREATEST(member_count - 1, 0) WHERE id = $1',
      [serverId]
    );

    res.json({
      success: true,
      message: 'Successfully left server'
    });

  } catch (error) {
    console.error('Leave server error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to leave server'
    });
  }
});

// Get server members
router.get('/:serverId/members', authenticateToken, async (req, res) => {
  try {
    const { serverId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const result = await query(
      `SELECT u.id, u.name, u.role, u.country, u.verification_status,
              p.profile_image, p.reputation_points, sm.role as server_role, sm.joined_at
       FROM server_members sm
       JOIN users u ON sm.user_id = u.id
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE sm.server_id = $1
       ORDER BY sm.joined_at DESC
       LIMIT $2 OFFSET $3`,
      [serverId, limit, offset]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch members'
    });
  }
});

module.exports = router;
