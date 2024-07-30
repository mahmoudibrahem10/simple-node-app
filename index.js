const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Route to get data from PostgreSQL
app.get('/', async (req, res) => {
  try {
    // Query to get all users
    const result = await pool.query('SELECT * FROM users');
    
    // Format the result as HTML
    const users = result.rows.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
      </tr>
    `).join('');

    // Send response
    res.send(`
      <h1>Users List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${users}
        </tbody>
      </table>
    `);
  } catch (err) {
    res.status(500).send(`Error querying database: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
