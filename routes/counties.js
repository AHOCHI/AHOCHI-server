var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

router.get('/', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("countiesServed", function(err, counties){
		if (err) throw err;
		res.json(counties);
	});
});

router.get('/:state', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("countiesServed", {state: req.params.state }, function(err, counties){
		if (err) throw err;
		res.json(counties);
	});
});

module.exports = router;