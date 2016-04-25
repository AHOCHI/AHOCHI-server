var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

router.get('/', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("city", function(err, cities){
		if (err) throw err;
		res.json(cities);
	});
});

router.get('/:state', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("city", {state: req.params.state }, function(err, cities){
		if (err) throw err;
		res.json(cities);
	});
});

module.exports = router;