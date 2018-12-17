var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {

    var db = req.con;
    var data = "";

    db.query('SELECT CourseName FROM COURSE', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        res.render('index', { title: 'Account Information', data: data});
    });

});
module.exports = router;