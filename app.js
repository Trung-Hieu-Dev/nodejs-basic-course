const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");

// using express router
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// template engine configuration
app.set("view engine", "ejs");
app.set("views", "views");

// parse body
app.use(bodyParser.urlencoded({ extended: false }));
// static path
app.use(express.static(path.join(rootDir, "public")));

// routes
app.use("/admin", adminData.routes); // filtering paths
app.use(shopRoutes);

// 404 page
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" }); // pass data to template { pageTitle: "Page Not Found" }
});

app.listen(3000);
