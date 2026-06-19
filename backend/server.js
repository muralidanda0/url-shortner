const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");


const { redirectUrl } = require("./controllers/urlController");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url", urlRoutes);


app.get("/", (req, res) => {
  res.send("URL Shortener API Running");
});
app.get("/:shortCode", redirectUrl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});