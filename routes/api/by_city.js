var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = null;
if (process.env.AHOCHI_PROXY) {
	db = monk(process.env.AHOCHI_PROXY + ':27017/ahochiMEAN');
}
else {
	db = monk('localhost:27017/ahochiMEAN');
}

//providers by state route
router.get('/:city', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		city: req.params.city
	}, function(err, providers) {
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:city/:search_string', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		city: req.params.city,
		$text: {
			$search: req.params.search_string
		}
	}, function(err, providers) {
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:city/by_service/:service', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		city: req.params.city,
		services: req.params.service
	}, function(err, providers) {
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:city/by_service/:service/:search_string', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		city: req.params.city,
		services: req.params.service,
		$text: {
			$search: req.params.search_string
		}
	}, function(err, providers) {
		if (err) throw err;
		res.json(providers);
	});
});

module.exports = router;