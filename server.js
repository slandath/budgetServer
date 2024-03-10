// Express
const express = require("express");
const app = express();

// Database
const { Client } = require("pg");
const client = new Client({
  user: process.env.PGUSER,
  password: process.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to database on Railway");
  } catch (err) {
    console.error("Error connecting to database: ", err);
  }
}

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Tom's Web Server");
});

// Success Messages
app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
connectToDatabase();
