const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Create order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, delivery_address, notes } = req.body;
    const user_id = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain items' });
    }

    // Calculate total
    let total_amount = 0;
    for (const item of items) {
      const productResult = await pool.query('SELECT price FROM products WHERE id = $1', [item.product_id]);
      if (productResult.rows.length === 0) {
        return res.status(404).json({ error: `Product ${item.product_id} not found` });
      }
      total_amount += productResult.rows[0].price * item.quantity;
    }

    // Create order
    const order_number = 'ORD-' + Date.now();
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, order_number, total_amount, delivery_address, notes, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, order_number, total_amount, delivery_address || '', notes || '', 'pending']
    );

    const order_id = orderResult.rows[0].id;

    // Add order items
    for (const item of items) {
      const productResult = await pool.query('SELECT price FROM products WHERE id = $1', [item.product_id]);
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order_id, item.product_id, item.quantity, productResult.rows[0].price]
      );
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: orderResult.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get user orders
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get order details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const itemsResult = await pool.query(
      'SELECT oi.*, p.name, p.description FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1',
      [id]
    );

    res.json({
      order: orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Order updated successfully',
      order: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
