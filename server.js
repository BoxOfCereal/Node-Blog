const express = require("express");
const server = express();
server.use(express.json());
server.use(morgan());
server.use(helmet());
server.use(cors());

const userRoutes = require("./routes/users");
server.use("/api/users", userRoutes);

const postsRoutes = require("./routes/posts");
server.use("/api/posts", postsRoutes);

module.exports = server;
