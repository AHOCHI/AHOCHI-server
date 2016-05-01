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

router.get('/', function(req, res) {
    var collection = db.get('providers');
    collection.distinct("services", function(err, services) {
        if (err) throw err;
        res.json(services);
    });
});

module.exports = router;