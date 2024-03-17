// Express
const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json())

// Database
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.PGURL,
});

// DB Connection Test
async function testConnection() {
  try {
    const pool = new Pool({
      connectionString: process.env.PGURL,
    });
    await pool.query('SELECT 1 + 1 AS test');
    await pool.end();
    console.log('Connection to Postgres successful!');
    return true;
  } catch (error) {
    console.error('Error testing connection:', error);
    return false;
  }
}

// Success Messages
testConnection().then((connected) => {
  if (connected) {
    console.log('Postgres connection is OK.');
  } else {
    console.error('Failed to connect to Postgres.');
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);



// Execute SQL Function
async function executeQuery(query, params = []) {
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    await client.release();
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Tom's Web Server");
});

// Get all transactions from budget database
app.get("/budget", async (req, res) => {
  const dbName = 'budget'
  const sql = `SELECT * FROM ${dbName}`
  const transactions = await executeQuery(sql)
  res.json(transactions.rows)
})

// Execute SQL Query
app.get('/sql', async (req, res) => {
  const sql = 'DROP TABLE monthly-budget'
  const query = await executeQuery(sql);
  res.json(query.rows);
});

app.post('/add', async(req, res) => {
  console.log(req.body.category, req.body.description, req.body.amount)
  const sql = "INSERT INTO budget (category, description, amount) VALUES ('expense', 'internet', 65)"
  const query = await executeQuery(sql)
  res.json(query.rows)
})
