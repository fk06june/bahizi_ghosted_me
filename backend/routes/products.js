const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category_id, search } = req.query;
    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.available = TRUE';
    const params = [];

    if (category_id) {
      query += ' AND p.category_id = $' + (params.length + 1);
      params.push(category_id);
    }

    if (search) {
      query += ' AND (p.name ILIKE $' + (params.length + 1) + ' OR p.description ILIKE $' + (params.length + 1) + ')';
      params.push('%' + search + '%');
    }

    query += ' ORDER BY p.name';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get categories
router.get('/categories/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
