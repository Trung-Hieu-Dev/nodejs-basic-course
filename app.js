const http = require("http");
const routes = require("./routes");

// create a local server
const server = http.createServer(routes);

server.listen(3000);
