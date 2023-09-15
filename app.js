const http = require('http')

// create a local server
const server = http.createServer((req, res) => {
  console.log(req)
})

server.listen(3000)



