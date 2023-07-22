// index.js
const http = require('http');
const { mainController } = require('./controllers/mainController');


const host = 'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
  mainController.handleRequest(req, res);
});

server.listen(port, host, () => {
  console.log(`Server is Running at: http://${host}:${port}`);
});
