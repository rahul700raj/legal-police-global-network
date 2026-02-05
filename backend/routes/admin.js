const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { query } = require('../config/database');

// All admin routes require admin role
router.use(authenticateToken, authorizeRole('admin'));

// Get pending verifications
router.get('/verifications/pending', async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.email, u.name, u.role, u.country, u.created_at,
              p.bio, p.experience_years, p.specialization, p.organization
       FROM users u
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE u.verification_status = 'pending'
       ORDER BY u.created_at DESC`
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get pending verifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending verifications'
    });
  }
});

// Approve user verification
router.post('/verifications/:userId/approve', async (req, res) => {
  try {
    const { userId } = req.params;

    await query(
      'UPDATE users SET verification_status = $1 WHERE id = $2',
      ['verified', userId]
    );

    // Award "Verified Expert" achievement
    const achievement = await query(
      "SELECT id FROM achievements WHERE title = 'Verified Expert'"
    );
    
    if (achievement.rows.length > 0) {
      await query(
        'INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [userId, achievement.rows[0].id]
      );
    }

    // Add reputation points
    await query(
      'UPDATE profiles SET reputation_points = reputation_points + 100 WHERE user_id = $1',
      [userId]
    );

    // Create notification
    await query(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, 'Account Verified', 'Your account has been verified! You now have full access to all features.', 'verification']
    );

    res.json({
      success: true,
      message: 'User verified successfully'
    });

  } catch (error) {
    console.error('Approve verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve verification'
    });
  }
});

// Reject user verification
router.post('/verifications/:userId/reject', async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    await query(
      'UPDATE users SET verification_status = $1 WHERE id = $2',
      ['rejected', userId]
    );

    // Create notification
    await query(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES ($1, $2, $3, $4)`,
      [userId, 'Verification Rejected', reason || 'Your verification request has been rejected. Please contact support for more information.', 'verification']
    );

    res.json({
      success: true,
      message: 'Verification rejected'
    });

  } catch (error) {
    console.error('Reject verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject verification'
    });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const result = await query(
      `SELECT u.id, u.email, u.name, u.role, u.country, u.verification_status, 
              u.is_active, u.created_at,
              p.reputation_points, p.total_contributions
       FROM users u
       LEFT JOIN profiles p ON u.id = p.user_id
       ORDER BY u.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Deactivate user
router.post('/users/:userId/deactivate', async (req, res) => {
  try {
    const { userId } = req.params;

    await query(
      'UPDATE users SET is_active = false WHERE id = $1',
      [userId]
    );

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });

  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate user'
    });
  }
});

// Get analytics
router.get('/analytics', async (req, res) => {
  try {
    const stats = await query(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE is_active = true) as total_users,
        (SELECT COUNT(*) FROM users WHERE verification_status = 'verified') as verified_users,
        (SELECT COUNT(*) FROM users WHERE verification_status = 'pending') as pending_verifications,
        (SELECT COUNT(*) FROM servers) as total_servers,
        (SELECT COUNT(*) FROM messages) as total_messages,
        (SELECT COUNT(*) FROM articles WHERE is_published = true) as total_articles,
        (SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days') as new_users_week,
        (SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '30 days') as new_users_month
    `);

    // Get user growth by month
    const growth = await query(`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as count
      FROM users
      WHERE created_at > NOW() - INTERVAL '12 months'
      GROUP BY month
      ORDER BY month DESC
    `);

    res.json({
      success: true,
      data: {
        ...stats.rows[0],
        userGrowth: growth.rows
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

module.exports = router;
