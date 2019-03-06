const express = require("express");
const server = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
server.use(express.json());
server.use(morgan());
server.use(helmet());
server.use(cors());

const userRoutes = require("./routes/users");
server.use("/api/users", userRoutes);

const postsRoutes = require("./routes/posts");
server.use("/api/posts", postsRoutes);

module.exports = server;
