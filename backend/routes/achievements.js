const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { query } = require('../config/database');

// Get all achievements
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM achievements ORDER BY points_required ASC'
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements'
    });
  }
});

// Get user achievements
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await query(
      `SELECT a.*, ua.earned_at
       FROM user_achievements ua
       JOIN achievements a ON ua.achievement_id = a.id
       WHERE ua.user_id = $1
       ORDER BY ua.earned_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get user achievements error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user achievements'
    });
  }
});

// Get leaderboard
router.get('/leaderboard', authenticateToken, async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const result = await query(
      `SELECT u.id, u.name, u.role, u.country,
              p.profile_image, p.reputation_points, p.total_contributions,
              COUNT(ua.id) as achievement_count
       FROM users u
       LEFT JOIN profiles p ON u.id = p.user_id
       LEFT JOIN user_achievements ua ON u.id = ua.user_id
       WHERE u.is_active = true AND u.verification_status = 'verified'
       GROUP BY u.id, u.name, u.role, u.country, p.profile_image, p.reputation_points, p.total_contributions
       ORDER BY p.reputation_points DESC, achievement_count DESC
       LIMIT $1`,
      [limit]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard'
    });
  }
});

module.exports = router;
