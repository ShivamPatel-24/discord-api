require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connection established");
});

const server = http.createServer(app);

port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
