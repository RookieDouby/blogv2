var express = require('express');
var router = express.Router();

router.get('/:name',function(req, res) {//name is a placeholder
    res.send('Hello, ' + req.params.name);
});

module.exports = router;