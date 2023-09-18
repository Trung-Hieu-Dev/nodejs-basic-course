const express = require("express");

const app = express();

// middleware running in every incoming request
app.use("/", (req, res, next) => {
  console.log("This always run!");
  next(); // allow next middleware running
});

app.use("/product", (req, res, next) => {
  console.log("In the product middleware");
  res.send("<h1>Hello from Product Page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In the middleware");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
