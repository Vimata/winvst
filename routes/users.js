var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {users:['Jessica', 'Dan', 'Matt', 'Elbert', 'Monica', 'Jonny']});
});

module.exports = router;
