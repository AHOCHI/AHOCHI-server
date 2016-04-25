var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/ahochiMEAN');

//search page route
router.get('/', function(req, res) {
    res.render('search', {
        title: 'Search'
    });
});

module.exports = router;