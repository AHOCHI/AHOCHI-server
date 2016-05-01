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

//search page route
router.get('/', function(req, res) {
    res.render('search', {
        title: 'Search',
        controller: 'search'
    });
});

module.exports = router;