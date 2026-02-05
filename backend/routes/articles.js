const express = require('express');
const router = express.Router();
const { authenticateToken, requireVerification } = require('../middleware/auth');
const { query } = require('../config/database');

// Get all published articles
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { category, limit = 20, offset = 0 } = req.query;

    let queryText = `
      SELECT a.id, a.title, a.content, a.category, a.tags, a.views, a.likes, a.created_at,
             u.id as author_id, u.name as author_name, u.role as author_role,
             p.profile_image as author_image
      FROM articles a
      JOIN users u ON a.author_id = u.id
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE a.is_published = true
    `;
    const params = [];
    let paramCount = 1;

    if (category) {
      queryText += ` AND a.category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    queryText += ` ORDER BY a.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch articles'
    });
  }
});

// Get article by ID
router.get('/:articleId', authenticateToken, async (req, res) => {
  try {
    const { articleId } = req.params;

    const result = await query(
      `SELECT a.*, 
              u.id as author_id, u.name as author_name, u.role as author_role,
              p.profile_image as author_image, p.specialization as author_specialization
       FROM articles a
       JOIN users u ON a.author_id = u.id
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE a.id = $1 AND a.is_published = true`,
      [articleId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment view count
    await query(
      'UPDATE articles SET views = views + 1 WHERE id = $1',
      [articleId]
    );

    // Get comments
    const comments = await query(
      `SELECT c.id, c.content, c.created_at,
              u.id as user_id, u.name as user_name, u.role as user_role,
              p.profile_image
       FROM comments c
       JOIN users u ON c.user_id = u.id
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE c.article_id = $1 AND c.parent_comment_id IS NULL
       ORDER BY c.created_at DESC`,
      [articleId]
    );

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        comments: comments.rows
      }
    });

  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch article'
    });
  }
});

// Create article
router.post('/', authenticateToken, requireVerification, async (req, res) => {
  try {
    const { title, content, category, tags, fileAttachments } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const result = await query(
      `INSERT INTO articles (author_id, title, content, category, tags, file_attachments, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, true)
       RETURNING *`,
      [req.user.id, title, content, category, tags || [], fileAttachments || []]
    );

    // Update user contribution count and reputation
    await query(
      `UPDATE profiles 
       SET total_contributions = total_contributions + 1,
           reputation_points = reputation_points + 10
       WHERE user_id = $1`,
      [req.user.id]
    );

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create article'
    });
  }
});

// Add comment to article
router.post('/:articleId/comments', authenticateToken, requireVerification, async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comment content required'
      });
    }

    const result = await query(
      `INSERT INTO comments (article_id, user_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [articleId, req.user.id, content]
    );

    // Update user contribution count
    await query(
      'UPDATE profiles SET total_contributions = total_contributions + 1 WHERE user_id = $1',
      [req.user.id]
    );

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add comment'
    });
  }
});

// Like article
router.post('/:articleId/like', authenticateToken, async (req, res) => {
  try {
    const { articleId } = req.params;

    await query(
      'UPDATE articles SET likes = likes + 1 WHERE id = $1',
      [articleId]
    );

    res.json({
      success: true,
      message: 'Article liked'
    });

  } catch (error) {
    console.error('Like article error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like article'
    });
  }
});

module.exports = router;
