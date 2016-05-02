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

var optToEndpoint = {
	service: 'services',
	county: 'countiesServed'
}

router.get('/', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("zip", function(err, zips) {
		if (err) throw err;
		res.json(zips);
	});
});

router.post('/', function(req, res) {

	var query = {};

	for (var i in req.body) {
		if (optToEndpoint[i]) {
			query[optToEndpoint[i]] = req.body[i];
		}
		else {
			query[i] = req.body[i];
		}
	}

	var collection = db.get('providers');
	collection.distinct("zip", query, function(err, zips) {
		if (err) throw err;
		res.json(zips);
	});
});

router.get('/:state', function(req, res) {
	var collection = db.get('providers');
	collection.distinct("zip", {
		state: req.params.state
	}, function(err, zips) {
		if (err) throw err;
		res.json(zips);
	});
});

module.exports = router;