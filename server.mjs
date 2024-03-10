import express from "express";
const app = express();

import { createClient } from "@libsql/client";
const client = createClient({
  url: "libsql://monthly-budget-slandath.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTAwNzc2MTcsImlkIjoiNmJkNmQxNjAtM2MwYy00YTM0LThjMmEtNGM3ZDEzNTdlM2I2In0.kazdf7O56ybrWf35MUcMJBBc4VO-gPXBw1vKtozMzZOhfJdNHvBJ_OjHp-2eF7RPQfNDvRtIi5QzxiX_EmwCAw",
});
const result = await client.execute(
  "SELECT category, description, amount FROM transactions WHERE ID = 1",
);

app.get("/", (req, res) => {
  res.send("Welcome to Tom's Web Server");
});

app.get("/db", (req, res) => {
  res.json(result);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
