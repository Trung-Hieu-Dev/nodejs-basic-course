const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");

// using express router
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes); // filtering paths
app.use(shopRoutes);

// 404 page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
