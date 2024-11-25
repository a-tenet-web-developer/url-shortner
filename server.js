const express = require("express");
const shortenRouter = require("./routes/shorten");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/shorten", shortenRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
