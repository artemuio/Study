var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  start(req,res);
});

function start(req,res) {
  if (!req.isAuthenticated()) {
    fs.readFile('index.html', function (err, info) {
      if (err) {
        console.log("Error in reading index.html");
        res.writeHead(500);
        res.end("Error in server");
        return;
      }
      res.end(info);
    });
  } else {
    res.redirect('/profile');
  }
}

module.exports = router;
