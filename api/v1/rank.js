/**
 * 排行榜模块
 * 上传分数打榜，
 * 读取分数
 * 读取排行榜
 */

var request = require('request');
var http = require('http');
var parse = require('url').parse;

//db 模块
// @TODO 单独公用模块

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fmin'
});

connection.connect({debug: true});

exports.postScore = function(req, res) {
	// console.log(req.)
	var data = req.body;
	console.log(data);
	connection.query('SELECT name from fmin WHERE name= ?', data.name, function(err, rows) {
		console.log(rows[0]);
		if(rows[0]) {
			connection.query('UPDATE fmin SET ? WHERE name = ?', [data, data.name] , function(err, result) {
				res.send('User update tto database with ID');
			})
		} else {
			connection.query('INSERT fmin SET ? ', data, function(err, result) {
				res.send('User update tto database with ID');	
			})
		}

	})
}

exports.getRank = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	connection.query('SELECT * from fmin', function(err, rows, fields) {
		console.log(rows);
		res.send(rows);
	})
}