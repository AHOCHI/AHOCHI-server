var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

router.get('/', function(req, res) {
	var collection = db.get('providers');
	collection.find({}, function(err, providers){
		if (err) throw err;
		res.json(providers);
	});
});

module.exports = router;