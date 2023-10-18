const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");
const mongoConnect = require('./utils/database').mongoConnect

// controllers
const errController = require("./controllers/error");


const app = express();

// template engine configuration
app.set("view engine", "ejs");
app.set("views", "views");

// using express router
const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

// parse body
app.use(bodyParser.urlencoded({ extended: false }));
// static path
app.use(express.static(path.join(rootDir, "public")));

// middleware => data available in all app
app.use((req, res, next) => {
    // User
    //     .findByPk(1)
    //     .then((user) => {
    //         req.user = user
    //         next()
    //     })
    //     .catch(err => console.log(err))
    next()
})

// routes
app.use("/admin", adminRoutes);
// app.use(shopRoutes);
// app.use(errController.getErrorPage);

mongoConnect(() => {
    app.listen(3000)
})

