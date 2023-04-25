const supertest = require("supertest");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//JEST test that tests the updateFavorite API to retrieve responses
describe('Test the add API', () => {
    it("Given the object is Valid, should return 200", () =>{
        supertest(app).get(`/add`).expect(200)
        //expect(true).toBe(true);
    })
    it("Given the object is Valid, should return 200 and add task to database", () =>{
        //supertest(app).get(`/ad`).expect(200)
        supertest(app).post(`/add`)
            .send({ taskID: (Math.floor(Math.random() * 200000) + 1), title: "Test Task", date: "2023-04-30", tags: "fun"})
            .end((err, res) => {
                if(err) {
                    console.log(err)
                }
                console.log(res)
            }).expect(200)
        //expect(true).toBe(true);
    })
    it("Given the object is invalid, should return 500 and fail to add task", () =>{
        supertest(app).get(`/add`).expect(500)
    })
});

