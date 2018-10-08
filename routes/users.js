const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('users', {
		users: [ 'Jessica', 'Dan', 'Matt', 'Elbert', 'Monica', 'Jonny' ]
	});
});

module.exports = router;
