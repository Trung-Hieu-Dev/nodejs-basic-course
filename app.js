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

// middleware running in every incoming request
app.use((req, res, next) => {
  console.log("In the middleware");
  next(); // allow the next middleware running
});

app.use((req, res, next) => {
  console.log("In the another middleware");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);

// const server = http.createServer(app);
//
// server.listen(3000);
