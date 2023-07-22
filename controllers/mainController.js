// mainController.js
const fs = require('fs');
const { routes } = require('../models/routes');
const { redirects } = require('../models/redirects');

exports.handleRequest = (req, res) => {
  let routeFolderPath = './views/';
  let statusCode = 200;

  if (redirects.hasOwnProperty(req.url)) {
    res.writeHead(301, { 'Location': redirects[req.url] });
    res.end();
  } else if (routes.hasOwnProperty(req.url)) {
    routeFolderPath += routes[req.url];
  } else {
    routeFolderPath += '404.html';
    statusCode = 404;
  }

  fs.readFile(routeFolderPath, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      res.writeHead(statusCode, { 'content-type': 'text/html' });
      res.end(data);
    }
  });
};
module.exports = {mainController}