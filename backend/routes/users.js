const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { query } = require('../config/database');

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.email, u.name, u.role, u.country, u.verification_status,
              p.bio, p.experience_years, p.specialization, p.organization,
              p.phone, p.city, p.profile_image, p.linkedin_url,
              p.reputation_points, p.total_contributions
       FROM users u
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const {
      bio, experienceYears, specialization, organization,
      phone, city, profileImage, linkedinUrl
    } = req.body;

    const result = await query(
      `UPDATE profiles
       SET bio = COALESCE($1, bio),
           experience_years = COALESCE($2, experience_years),
           specialization = COALESCE($3, specialization),
           organization = COALESCE($4, organization),
           phone = COALESCE($5, phone),
           city = COALESCE($6, city),
           profile_image = COALESCE($7, profile_image),
           linkedin_url = COALESCE($8, linkedin_url)
       WHERE user_id = $9
       RETURNING *`,
      [bio, experienceYears, specialization, organization, phone, city, profileImage, linkedinUrl, req.user.id]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Get user by ID
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await query(
      `SELECT u.id, u.name, u.role, u.country, u.verification_status, u.created_at,
              p.bio, p.experience_years, p.specialization, p.organization,
              p.city, p.profile_image, p.reputation_points, p.total_contributions
       FROM users u
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE u.id = $1 AND u.is_active = true`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user achievements
    const achievements = await query(
      `SELECT a.title, a.description, a.badge_icon, ua.earned_at
       FROM user_achievements ua
       JOIN achievements a ON ua.achievement_id = a.id
       WHERE ua.user_id = $1
       ORDER BY ua.earned_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        achievements: achievements.rows
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
});

// Get global network statistics
router.get('/stats/global', authenticateToken, async (req, res) => {
  try {
    const stats = await query(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE is_active = true) as total_users,
        (SELECT COUNT(*) FROM users WHERE role = 'lawyer' AND is_active = true) as total_lawyers,
        (SELECT COUNT(*) FROM users WHERE role = 'police' AND is_active = true) as total_police,
        (SELECT COUNT(DISTINCT country) FROM users WHERE is_active = true) as total_countries,
        (SELECT COUNT(*) FROM servers WHERE is_active = true) as total_servers,
        (SELECT COUNT(*) FROM articles WHERE is_published = true) as total_articles
    `);

    // Get users by country
    const countryStats = await query(`
      SELECT country, COUNT(*) as count
      FROM users
      WHERE is_active = true
      GROUP BY country
      ORDER BY count DESC
      LIMIT 20
    `);

    res.json({
      success: true,
      data: {
        ...stats.rows[0],
        usersByCountry: countryStats.rows
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// Search users
router.get('/search/query', authenticateToken, async (req, res) => {
  try {
    const { q, role, country, limit = 20, offset = 0 } = req.query;

    let queryText = `
      SELECT u.id, u.name, u.role, u.country, u.verification_status,
             p.specialization, p.organization, p.profile_image, p.reputation_points
      FROM users u
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE u.is_active = true
    `;
    const params = [];
    let paramCount = 1;

    if (q) {
      queryText += ` AND (u.name ILIKE $${paramCount} OR p.specialization ILIKE $${paramCount})`;
      params.push(`%${q}%`);
      paramCount++;
    }

    if (role) {
      queryText += ` AND u.role = $${paramCount}`;
      params.push(role);
      paramCount++;
    }

    if (country) {
      queryText += ` AND u.country = $${paramCount}`;
      params.push(country);
      paramCount++;
    }

    queryText += ` ORDER BY p.reputation_points DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed'
    });
  }
});

module.exports = router;
