const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");
require('dotenv').config();
const mongoose = require('mongoose')

// controllers
const errController = require("./controllers/error");

// models
// const User = require("./models/user");

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

// middleware => data available in all app
// app.use((req, res, next) => {
//     User
//         .findById('6530af23b3552f58cd0048b5')
//         .then((user) => {
//             req.user = new User(user.email, user.password, user.cart, user._id)
//             next()
//         })
//         .catch(err => console.log(err))
// })

// routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errController.getErrorPage);

// connect to mongodb by mongoose
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.nv9juva.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('DB Connected!');
        app.listen(3000);
    })
    .catch(err => console.log(err))

