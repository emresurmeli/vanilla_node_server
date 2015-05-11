'use strict';

var http = require('http');
var url = require('url');
// Found a sweet time format on stack overflow by L0j1k
var currentTime = new Date();
/* jshint ignore:start */
var dateTime = "Server time: " + (currentTime.getMonth()+1) + "/"
                + currentTime.getDate() + "/" 
                + currentTime.getFullYear() + " @ "  
                + currentTime.getHours() + ":"  
                + currentTime.getMinutes() + ":" 
                + currentTime.getSeconds();
/* jshint ignore:end */

var server = http.createServer(function(req, res) {

	if(req.url === '/time') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({msg: dateTime})); // jshint ignore:line
		return res.end();
	}

	if(req.url.slice(0, 6) === '/greet') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		
		if(req.method === 'POST') {
			req.on('data', function(data) {
				var body = JSON.parse(data.toString());
				res.write(JSON.stringify({msg: 'hello ' + body.name}));
				return res.end();
			});
		}
		var body = req.url.slice(7);
		res.write(JSON.stringify({msg: 'hello ' + body}));
		return res.end();
	}

	res.writeHead(404, {'Content-Type': 'application/json'});
	res.write(JSON.stringify({msg: 'could not find page'}));
	res.end();

}).listen(3000, function() {
	console.log('server is running on localhost:3000');
});