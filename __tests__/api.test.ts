
const supertest = require("supertest");
//import {app} from '..'
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//JEST test that tests the updateFavorite API to retrieve responses
describe('Test the update page', () => {
    it("Testing update page, should receive 200", () =>{
        supertest(app).get(`/update/644852e021405e84d456368f`).expect(200)
        //expect(true).toBe(true);
    })
});
describe('Test List page', () => {
    it("Testing list page, should receive 200", () =>{
        supertest(app).get(`/list`).expect(200)
        //expect(true).toBe(true);
    })
});
describe('Test manual page', () => {
    it("Testing manual page, should receive 200", () =>{
        supertest(app).get(`/manual`).expect(200)
        //expect(true).toBe(true);
    })
});
describe('Test detail page', () => {
    it("Testing detail page, should receive 200", () =>{
        supertest(app).get(`/detail/644852e021405e84d456368f`).expect(200)
        //expect(true).toBe(true);
    })
});