
const supertest = require("supertest");
//import {app} from '..'
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//JEST Test to test the tomorrow API page
describe("Test the tomorrow API page", () => {
    it("Given the Tomorrow API route, a 200 status code should be returned", () => {
        supertest(app).get(`/tomorrow`).expect(200)
    })
})
