var request = require('request');
const req = require('supertest');
const app = require('../index');
const mongoose = require("mongoose");

describe('Icon Test', () => {
  it('Should add a task with an Icon', async () => {
	const res = await req(app);
    var request = require('request');
	var options = {
	  'method': 'POST',
	  'url': 'http://localhost:5500/add',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
		'title': 'Buy Groceries',
		'date': '4-20-2023',
		'icon': 'event'
	  }
	};
	request(options, function (error, response) {});
  });
});
