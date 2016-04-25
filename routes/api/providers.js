var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

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
				description: req.body.description
			}, function(err, provider){
				if (err) throw err;
				res.json(provider);
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