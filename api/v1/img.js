var request = require('request');
var Canvas = require('canvas');
var Image = Canvas.Image;
var http = require('http');
var parse = require('url').parse;
var fs = require('fs');

exports.maxScore = function(req, resss, next) {
    resss.header("Access-Control-Allow-Origin", "*");
	var canvas = new Canvas(640, 1136);
  	var ctx = canvas.getContext('2d');
    var url = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=zIhfdhAQ2qM2gHG4q8I1EqcU9AenE7wrYNCzRtA5&sort=votes_count&image_size=4';
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
                    // resss.send('<img src="' + canvas.toDataURL() + '">');
                }
            })
        })
    })

}

function drawImg(ctx, canvas) {

    var squid = fs.readFileSync(__dirname + '/test.jpg');
    img = new Image;
    img.src = squid;
    ctx.drawImage(img, 20, 0, img.width * 2/3, img.height * 2/3);
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    var text = '我是不是很聪明!';
    ctx.fillText(text, 300, 316);


    var out = fs.createWriteStream(__dirname + '/image-src.jpg')
      , stream = canvas.createJPEGStream();
    stream.on('data', function(chunk){
      out.write(chunk);
    });
    
}