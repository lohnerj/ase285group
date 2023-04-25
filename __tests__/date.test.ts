const supertest = require("supertest");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//JEST test that tests the updateFavorite API to retrieve responses
describe('Test the add API ', () => {
    it("Given the API call /add is valid, It should return a 200", () =>{
        supertest(app).get(`/add`).expect(200)
        //expect(true).toBe(true);
    })
});

