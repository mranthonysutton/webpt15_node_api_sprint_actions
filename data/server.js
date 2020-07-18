const express = require("express");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(morgan("tiny"));

server.use("/", (req, res) => {
  res.send({ message: "Projects API is running..." });
});

module.exports = server;
