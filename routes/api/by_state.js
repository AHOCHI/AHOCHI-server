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
router.get('/:state', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		state: req.params.state
	}, function(err, providers) {
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:state/:search_string', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		state: req.params.state,
		$text: {
			$search: req.params.search_string
		}
	}, function(err, providers) {
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:state/by_service/:service', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		state: req.params.state,
		services: req.params.service
	}, function(err, providers) {
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:state/by_service/:service/:search_string', function(req, res) {
	var collection = db.get('providers');
	collection.find({
		state: req.params.state,
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