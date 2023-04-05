const sum = require('./sum');
const app = require('./index')
const mongoose = require("mongoose");
const supertest = require("supertest");

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
})

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
