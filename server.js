require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(process.env.DB_CLOUD_URL).then(() => {
    console.log("DB connection established");
});

app.use("/api/auth", authRoutes);
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
