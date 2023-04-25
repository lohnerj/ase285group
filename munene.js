const request = require('supertest');
const app = require('./index'); //importing the app from index.js

describe('Test the /updateFavorite/:id path', () => {
    test('It should respond with a status of 200', async () => {
        const response = await request(app).put('/updateFavorite/1234'); //send a PUT request to the endpoint with an id parameter
        expect(response.statusCode).toBe(200); //expect the status code to be 200 OK
    });
});
