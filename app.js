const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");

// controllers
const errController = require("./controllers/error");

// import database configuration
const sequelize = require('./utils/database')

const app = express();

// template engine configuration
app.set("view engine", "ejs");
app.set("views", "views");

// using express router
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// parse body
app.use(bodyParser.urlencoded({ extended: false }));
// static path
app.use(express.static(path.join(rootDir, "public")));

// routes
app.use("/admin", adminRoutes); // filtering paths
app.use(shopRoutes);
app.use(errController.getErrorPage);

// Syncing JS Definitions to the Database. Create table by defined model
sequelize
    .sync()
    .then(result => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })

