var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  start(req,res);
});

function start(req,res) {
  if (!req.isAuthenticated()) {
    res.render('index');
  } else {
    res.redirect('/profile');
  }
}

module.exports = router;