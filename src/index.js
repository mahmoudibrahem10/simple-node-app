const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to get current time from PostgreSQL
app.get('/time', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ currentTime: result.rows[0].now });
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});

// API endpoint to get users from the database
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
