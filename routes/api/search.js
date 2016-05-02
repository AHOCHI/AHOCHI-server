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
    collection.find({}, {
            limit: 100,
            sort: {
                _id: 1
            }
        },
        function(err, providers) {
            if (err)
                throw err;
            res.json(providers);
        });
});

router.get('/:search_string', function(req, res) {
    var collection = db.get('providers');
    collection.find({
            $text: {
                $search: req.params.search_string
            }
        }, {
            limit: 100,
            sort: {
                _id: 1
            }
        },
        function(err, providers) {
            if (err)
                throw err;
            res.json(providers);
        });
});

router.post('/:search_string', function(req, res) {

    var query = {
        $text: {
            $search: req.params.search_string
        }
    };

    for (var i in req.body) {
        if (optToEndpoint[i]) {
            query[optToEndpoint[i]] = req.body[i];
        }
        else {
            query[i] = req.body[i];
        }
    }

    var collection = db.get('providers');
    collection.find(query, {
            limit: 100,
            sort: {
                _id: 1
            }
        },
        function(err, providers) {
            if (err) throw err;
            res.json(providers);
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
    collection.find(query, {
            limit: 100,
            sort: {
                _id: 1
            }
        },
        function(err, providers) {
            if (err) throw err;
            res.json(providers);
        });
});

module.exports = router;