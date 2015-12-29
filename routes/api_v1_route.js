var express = require('express');
var router = express.Router();
var img = require('../api/v1/img');

router.get('/img/maxScore', img.maxScore);

module.exports = router;