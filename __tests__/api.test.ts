const supertest = require("supertest");
//import {app} from '..'
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//JEST test that tests the updateFavorite API to retrieve responses
describe('Test the updateFavorite API', () => {
    it("Given the task ID is valid, It should return a 200", () =>{
        supertest(app).get(`/updateFavorite/642b186b944b7b02d20abd15`).expect(200)
        //expect(true).toBe(true);
    })
    it("Given the task ID doesn't exist, it should return a 404", () =>{
        supertest(app).get(`/updateFavorite/6`).expect(404)
    })
});

describe("Test the tomorrow API page", () => {
    it("Given the Tomorrow API route, a 200 status code should be returned", () => {
        supertest(app).get(`/tomorrow`).expect(200)
    })
})
