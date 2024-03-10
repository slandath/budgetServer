import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Tom's Web Server");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
