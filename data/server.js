const express = require("express");
const morgan = require("morgan");
const ProjectRouter = require("../projects/projectsRouter");
const ActionRouter = require("../actions/actionsRouter");

const server = express();

server.use(express.json());
server.use(morgan("tiny"));

server.use("/api/projects", ProjectRouter);
server.use("/api/actions", ActionRouter);

server.use("/", (req, res) => {
  res.send({ message: "Projects API is running..." });
});

server.use((error, req, res, next) => {
  console.log(error);
  res
    .status(500)
    .json({ message: "Something went wrong. Please try again later.", error });
});

module.exports = server;
