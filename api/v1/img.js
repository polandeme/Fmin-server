var request = require('request');
var Canvas = require('canvas');
var Image = Canvas.Image;
var http = require('http');
var parse = require('url').parse;
var fs = require('fs');

exports.maxScore = function(req, resss, next) {
	var canvas = new Canvas(320, 320);
  	var ctx = canvas.getContext('2d');
    var url = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=zIhfdhAQ2qM2gHG4q8I1EqcU9AenE7wrYNCzRtA5&sort=votes_count&image_size=600';
  	var consumenrKey = 'zIhfdhAQ2qM2gHG4q8I1EqcU9AenE7wrYNCzRtA5';
  	request({
        url: url
    }, function(err, res, body) {
        var body = JSON.parse(body);
        var sbody = body;
        var index = Math.floor(Math.random() * body.photos.length);
        var imgUrl = body.photos[index].image_url;
        request({
            url: imgUrl,
            encoding: 'binary'
        }, function(err, res, body) {
            fs.writeFile(__dirname + '/test.jpg', body, 'binary', function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('save success');
                    drawImg(ctx, canvas);
                    resss.send(sbody);
                }
            })
        })
    })

}

function drawImg(ctx, canvas) {

    var squid = fs.readFileSync(__dirname + '/test.jpg');
    img = new Image;
    img.src = squid;
    ctx.drawImage(img, 30, 50, img.width / 4, img.height / 4);

    var out = fs.createWriteStream(__dirname + '/image-src.png')
      , stream = canvas.createPNGStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });
    
}