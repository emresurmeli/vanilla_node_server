'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var currentTime = new Date();
/* jshint ignore:start */
var dateTime = "Server time: " + (currentTime.getMonth()+1) + "/"
                + currentTime.getDate() + "/" 
                + currentTime.getFullYear() + " @ "  
                + currentTime.getHours() + ":"  
                + currentTime.getMinutes() + ":" 
                + currentTime.getSeconds();
/* jshint ignore:end */

chai.use(chaiHttp);

require('../server');

describe('our server', function() {
	it('should respond to a /time request with the current server time', function(done) {
		chai.request('localhost:3000')
			.get('/time')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.msg).to.eql(dateTime); // jshint ignore: line
				done();
			});
	});

	it('should respond to a /greet by post request', function(done) {
		chai.request('localhost:3000')
			.get('/greet')
			.send({name: 'name'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.msg).to.not.eql('hello name');
				done();
			});
	});

	it('should respond to /greet/name with a greeting to the name in path', function(done) {
		chai.request('localhost:3000')
			.get('/greet/name')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.msg).to.eql('hello name');
				done();
			});
	});

	it('should have a 404 on error', function(done) {
		chai.request('localhost:3000')
			.get('/blahblah')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(404);
				expect(res.body.msg).to.eql('could not find page');
				done();
			});
	});
});