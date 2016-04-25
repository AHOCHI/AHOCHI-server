var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

//providers by state route
router.get('/:state', function(req, res) {
	var collection = db.get('providers');
	collection.find({state: req.params.state }, function(err, providers){
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:state/:search_string', function(req, res) {
	var collection = db.get('providers');
	collection.find({state: req.params.state, $text: { $search: req.params.search_string } }, function(err, providers){
		if (err) throw err;
		res.json(providers);
	});
});

module.exports = router;