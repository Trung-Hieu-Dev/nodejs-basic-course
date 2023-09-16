const http = require("http");

// create a local server
const server = http.createServer((req, res) => {
  // Sending request
  const url = req.url;
  /// routing request
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>",
    );
    res.write("</html>");
    return res.end();
  }

  // Sending response
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello NodeJS</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
