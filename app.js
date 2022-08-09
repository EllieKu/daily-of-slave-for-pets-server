const http = require('http');

// const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('hello'); // must be called on each response
});

server.listen(port, () => {
  console.log(`Listening on ${ port }`)
});