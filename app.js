const http = require('http');
const PORT = process.env.PORT || 5000;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('hello'); // must be called on each response
});

server.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`)
});