'use strict';
/**
 *	Test cases related to Patch module.
 */

let app = require('../../');
let request = require('supertest');
let assert = require('chai').assert;
let expect = require('chai').expect;

/**
 *	Write all possible test cases for Patch in the below describe block.
 */
describe('Readings APIs:', function() {

	describe('Add readings', function(){
		let today = new Date();
		today = today.getTime();
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/add')
				.send({
					'reading' : 25.5,
					'timestamp' : today,
					'sensorType' : 'temp'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Should response success message.', function() {
			assert.isDefined(result.message, 'message');
		});
	});

	describe('Add readings', function(){
		let back5Days = new Date();
		back5Days.setDate(back5Days.getDate() - 5);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/add')
				.send({
					'reading' : 24.5,
					'timestamp' : back5Days,
					'sensorType' : 'light'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Should response success message.', function() {
			assert.isDefined(result.message, 'message');
		});
	});

	describe('Add readings with wrong body', function(){
		let today = new Date();
		today = today.getTime();
		let back5Days = new Date();
		back5Days.setDate(back5Days.getDate() - 5);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/add')
				.send({
					'reading2' : 25.5,
					'timestamp2' : today,
					'sensorType' : 'temp'
				})
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Should response error message.', function() {
			assert.isDefined(result.error, 'message');
		});
	});

	describe('Get readings between today and 7 days back, without filter', function(){
		let today = new Date();
		today = today.getTime();
		let back7Days = new Date();
		back7Days.setDate(back7Days.getDate() - 7);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/get')
				.send({
					'fromDate' : back7Days,
					'toDate' : today
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Response should have two result.', function() {
			assert.isDefined(result.data, 'data');
			expect(result.data.length).to.equal(2);
		});
	});

	describe('Get readings between today and 3 days back, with wrong filter ', function(){
		let today = new Date();
		today = today.getTime();
		let back3Days = new Date();
		back3Days.setDate(back3Days.getDate() - 3);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/get')
				.send({
					'fromDate' : back3Days,
					'toDate' : today,
					'sensorType' : 'acbdhbc'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Response should have zero result.', function() {
			assert.isDefined(result.data, 'data');
			expect(result.data.length).to.equal(0);
		});
	});

	describe('Get readings between today and 7 days back, with filter', function(){
		let today = new Date();
		today = today.getTime();
		let back7Days = new Date();
		back7Days.setDate(back7Days.getDate() - 7);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/get')
				.send({
					'fromDate' : back7Days,
					'toDate' : today,
					'sensorType' : 'temp'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Response should have one result.', function() {
			assert.isDefined(result.data, 'data');
			expect(result.data.length).to.equal(1);
		});
	});

	describe('Get readings agg between today and 7 days back', function(){
		let today = new Date();
		today = today.getTime();
		let back7Days = new Date();
		back7Days.setDate(back7Days.getDate() - 7);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/agg')
				.send({
					'fromDate' : back7Days,
					'toDate' : today,
					'agg' : 'max'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Response should max value as 25.5.', function() {
			assert.isDefined(result.data, 'data');
			expect(result.data[0].max).to.equal(25.5);
		});
	});

	describe('Get readings agg between today and 7 days back', function(){
		let today = new Date();
		today = today.getTime();
		let back7Days = new Date();
		back7Days.setDate(back7Days.getDate() - 7);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/agg')
				.send({
					'fromDate' : back7Days,
					'toDate' : today,
					'agg' : 'min'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Response should min value as 24.5.', function() {
			assert.isDefined(result.data, 'data');
			expect(result.data[0].min).to.equal(24.5);
		});
	});
	describe('Get readings agg between today and 7 days back', function(){
		let today = new Date();
		today = today.getTime();
		let back7Days = new Date();
		back7Days.setDate(back7Days.getDate() - 7);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/agg')
				.send({
					'fromDate' : back7Days,
					'toDate' : today,
					'agg' : 'avg'
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Response should avg value as 25.', function() {
			assert.isDefined(result.data, 'data');
			expect(result.data[0].avg).to.equal(25);
		});
	});
	describe('Get readings agg with wrong input', function(){
		let today = new Date();
		today = today.getTime();
		let back7Days = new Date();
		back7Days.setDate(back7Days.getDate() - 7);
		let result;
		beforeEach(function(done) {
			request(app)
				.post('/api/readings/agg')
				.send({
					'fromDat2e' : back7Days,
					'toDa2te' : today,
					'agg' : 'avg'
				})
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if(err) {
						return done(err);
					}
					result = res.body;
					done();
				});
		});

		it('Response should have error message.', function() {
			assert.isDefined(result.error, 'error');
		});
	});

});
