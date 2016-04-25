var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

//search route
router.get('/:search_string', function(req, res) {
    var collection = db.get('providers');
    collection.find({
        $text: {
            $search: req.params.search_string
        }
    }, function(err, providers) {
        if (err) throw err;
        res.json(providers);
    });
});

module.exports = router;