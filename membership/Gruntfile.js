var config = require("./config");
var assert = require("assert");
var knex = require('./config/dbconfig');

module.exports = function  (grunt) {
	grunt.initConfig({
		jshint: {
			files: ['lib/**/*js', 'models/**/*.js']
		},
		watch: {
			files: ['lib/**/*js', 'models/**/*.js'],
			tasks: ['jshint']
		}
	});

	//grunt.registerTask("installDb", function () {
	//	var done = this.async(function () {
	//		connection.end();
	//	});
	//	knex.schema.createTable('users', function (table) {
	//		table.increments('id');
	//		table.string('username');
	//		table.string('name');
	//		table.string('password');
	//		table.string('email');
	//	}).then(function (result) {
	//		assert.ok();
	//		console.log("Db installed: " + result);
	//		done();
	//	}).catch(function (error) {
	//		console.error("Installation was failed: " + error);
	//		done();
	//	});
	//});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
};