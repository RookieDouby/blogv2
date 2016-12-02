var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function(req, res, next) {
    res.render('posts');
});
//post an article
router.post('/', checkLogin, function(req, res, next) {
    res.send(req.flash());
});
//create article page
router.get('/create', checkLogin, function(req, res, next) {
    res.send(req.flash());
});
//single article page
router.get('/:postId', function(req, res, next) {
    res.send(req.flash());
});
//edit article page
router.get('/:postId/edit', checkLogin, function(req, res, next) {
    res.send(req.flash());
});
//post and update an article
router.post('/:postId/edit', checkLogin, function(req, res, next) {
    res.send(req,flash());
});
router.get('/:postId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});
//cretea a comment
router.post('/:postId/comment', checkLogin, function(req, res, next) {
    res.send(req.flash());
});
//delete a comment
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;
