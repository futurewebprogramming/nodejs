const { routes } = require('../models/routes');
const { redirects } = require('../models/redirects');
const mainController = require('../controllers/mainController');

module.exports = (req, res) => {
  let routeFolderPath = './views/';
  let statusCode = 200;

  // Custom router for handling redirects
  if (redirects.hasOwnProperty(req.url)) {
    res.writeHead(301, { 'Location': redirects[req.url] });
    res.end();
  } else if (routes.hasOwnProperty(req.url)) {
    routeFolderPath += routes[req.url];
  } else {
    routeFolderPath += '404.html';
    statusCode = 404;
  }

  // Read the file and send the response
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
