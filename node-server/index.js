const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const message = `Hello from server running on port ${PORT}`;
  console.log(message);
  res.send(message);
});

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
