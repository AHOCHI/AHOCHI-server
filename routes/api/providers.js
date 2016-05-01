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

router.get('/', function(req, res) {
	var collection = db.get('providers');
	collection.find({}, function(err, providers){
		if (err) throw err;
		res.json(providers);
	});
});

router.post('/', function(req, res){
	var collection = db.get('providers');
	
	//check for duplicate provider based on name
	collection.findOne({name: req.body.name }, function(err, provider){
		if (err) throw err;
		
		if(provider != null){
			//if already exists return the provider
			res.json(provider);
		}
		
		else{
			var address_string = req.body.street + " " + req.body.city + " " + req.body.state;
			geocoder.geocode(address_string, function(err, data) {
				var coords = [];
				if(err){
					coords[0] = 0;
					coords[1] = 0;
				}
				else{
					coords[0] = data[0].longitude;
					coords[1] = data[0].latitude;
				}

				collection.insert({
					name: req.body.name,
					phone: req.body.phone,
					street: req.body.street,
					city: req.body.city,
					state: req.body.state,
					zip: req.body.zip,
					services: req.body.services,
					countiesServed: req.body.counties,
					website: req.body.website,
					description: req.body.description,
					location: {
						"type" : "Point",
						"coordinates" : coords
					}
				}, function(err, provider){
					if (err) throw err;
					res.json(provider);
				});
			});
		};
	});
});

router.get('/:id', function(req, res) {
	var collection = db.get('providers');
	collection.findOne({_id: req.params.id }, function(err, provider){
		if (err) throw err;
		res.json(provider);
	});
});

router.put('/:id', function(req, res) {
	var collection = db.get('providers');
	collection.update({
		_id: req.params.id
	},
	{
		name: req.body.name,
		phone: req.body.phone,
		street: req.body.street,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		services: req.body.services,
		countiesServed: req.body.counties,
		website: req.body.website,
		description: req.body.description	
	}, function(err, provider){
		if (err) throw err;
		res.json(provider);
	});
});

router.delete('/:id', function(req, res) {
	var collection = db.get('providers');
	collection.remove({ _id: req.params.id }, function(err, provider){
		if (err) throw err;
		res.json(provider);
	});
});

module.exports = router;