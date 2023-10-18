const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");

// controllers
const errController = require("./controllers/error");

// import database configuration
const sequelize = require('./utils/database')

// models
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

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
app.use((req, res, next) => {
    User
        .findByPk(1)
        .then((user) => {
            req.user = user // create associate object
            next() // pass user through all app
        })
        .catch(err => console.log(err))
})

// routes
app.use("/admin", adminRoutes); // filtering paths
app.use(shopRoutes);
app.use(errController.getErrorPage);

// define associations (tables relationship)
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }) // {constraints: true, onDelete: 'CASCADE'}: When delete user, products gone
User.hasMany(Product) // optional

User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, { through: OrderItem })


// Syncing JS Definitions to the Database. Create table by defined model
sequelize
    .sync({ force: true }) // create all tables again with empty data
    // .sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Admin', email: 'admin@mail.com' })
        }
        return user
    })
    .then((user) => {
        // console.log(user);
        return user.createCart()
    })
    .then((cart) => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })

