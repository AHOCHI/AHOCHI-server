var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

//providers by state route
router.get('/:city', function(req, res) {
	var collection = db.get('providers');
	collection.find({city: req.params.city }, function(err, providers){
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:city/:search_string', function(req, res) {
	var collection = db.get('providers');
	collection.find({city: req.params.city, $text: { $search: req.params.search_string } }, function(err, providers){
		if (err) throw err;
		res.json(providers);
	});
});

module.exports = router;