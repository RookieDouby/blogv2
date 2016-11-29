var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//signin page
router.get('/', checkNotLogin, function(req, res, next) {
    res.send(req.flash());
});
//sign in
router.post('/', checkNotLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;
