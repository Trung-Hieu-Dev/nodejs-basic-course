// nodejs
// const http = require("http");
// const routes = require("./routes");
//
// // create a local server
// const server = http.createServer(routes);
//
// // test
// server.listen(3000);

// express
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

server.listen(3000);
