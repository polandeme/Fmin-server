var express = require('express');
var router = express.Router();

var img = require('../api/v1/img');
var rank = require('../api/v1/rank');

router.get('/img/maxScore', img.maxScore);


router.post('/rank/postScore', rank.postScore);

router.get('/rank/getRank', rank.getRank);


module.exports = router;