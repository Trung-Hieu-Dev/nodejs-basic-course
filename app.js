const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");

// using express router
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// controllers
const errController = require("./controllers/error");

const app = express();

// template engine configuration
app.set("view engine", "ejs");
app.set("views", "views");

// parse body
app.use(bodyParser.urlencoded({ extended: false }));
// static path
app.use(express.static(path.join(rootDir, "public")));

// routes
app.use("/admin", adminRoutes); // filtering paths
app.use(shopRoutes);

// 404 page
app.use(errController.getErrorPage);

app.listen(3000);
