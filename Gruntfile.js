'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		simplemocha: {
			dev: {
				src: ['test/*.js']
			}
		},

		jshint: {
			dev: {
				src: ['Gruntfile.js', 'server.js', 'test/*.js',]
			},
			options: {
				jshintrc: true
			}
		},

		watch: {
			files: ['test/*.js', 'server.js'],
			tasks: ['jshint:dev', 'simplemocha:dev']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//register default task
	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint:dev', 'simplemocha:dev']);
};