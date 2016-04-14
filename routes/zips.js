var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

router.get('/', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("zip", function(err, zips){
		if (err) throw err;
		res.json(zips);
	});
});

router.get('/:state', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("zip", {state: req.params.state }, function(err, zips){
		if (err) throw err;
		res.json(zips);
	});
});

module.exports = router;