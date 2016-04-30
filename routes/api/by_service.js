var express = require('express');
var router = express.Router();
var google_API_key = process.env.GOOGLE_API_KEY;

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

var geocoderProvider = 'google';
var httpAdapter = 'https';
// optional 
var extra = {
    apiKey: google_API_key, // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

//search route
router.get('/:service', function(req, res) {
	var collection = db.get('providers');
	collection.find({ services: req.params.service }, function(err, providers){
		if (err) throw err;
		res.json(providers);
	});
});

router.get('/:service/near/:address_string/:max_dist', function(req, res) {
	var max_dist_meters = req.params.max_dist * 1609.34;

	geocoder.geocode(req.params.address_string, function(err, data) {
		var coords = [];
			
		if(err){
			coords[0] = 0;
			coords[1] = 0;
		}
		else{
			coords[0] = data[0].longitude;
			coords[1] = data[0].latitude;
		}

		var collection = db.get('providers');
		collection.find({ services: req.params.service,
						location:
							{ $near :
								{
									$geometry: { type: "Point",  coordinates: coords },
									$minDistance: 1,
									$maxDistance: max_dist_meters
								}
							} }, function(err, providers){
			if (err) throw err;
			res.json(providers);
		});
	});
});

module.exports = router;