// npm install express
// npm install ejs
// npm install -g nodemon
// npm install method-override
// nodemon ./index.js
// Access this server with http://localhost:5500/pet or http://localhost:5500/

/*
*KNOWN ISSUES!: 
- Counter collection isn't used at all for the API functionality. It currently just exists. 
- ListJSON is broken, and I have no idea what it's purpose is
*/

var db;

//Updated variables for express, mongoose, and dotenv
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { taskModel, counterModel } = require('./models/models.ejs');

//Setting webapp to use bodyparser and urlencoder
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
//Setting express to use EJS
app.set('view engine', 'ejs');
//IMPORTANT: *Not sure what this does
app.use('/public', express.static('public'));

//Code block to startup the web server
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_CONNECT);
  console.log("Connected to db!");
  app.listen(5500, () => console.log("Server Up and running"));
}

//Homepage request
app.get('/', function (req, resp) {
    try {
        resp.render('write.ejs')
    } catch (e) {
        console.error(e);
    }
});
//API call to add task to the database
app.post('/add', function (req, resp) {
    runAddPost(req, resp);
    resp.redirect('/')
});
//Function to add task to the database
async function runAddPost(req, resp) {
    try {
        //Random number is generated and set as the ID
        let number = await (Math.floor(Math.random() * 200000));
        const task = await new taskModel({ taskID: number, title: req.body.title, date: req.body.date })
        //Saves new task to the Database
        await task.save();
    } catch (e) {
        console.error(e);
    }
}

app.get('/list', async function (req, res, next) {
    try {
        //Finds all tasks currently stored in the database
        const tasks = await taskModel.find().exec();
        //Creates query out of tasklist defined above
        const query = { posts: tasks };
        //renders the list page using the tasks above
        res.render('list.ejs', query);
    } catch (error) {
        //display the error
        console.error(error);
        //send the error as a response
        res.status(500).send({ error: 'Error getting tasks' });
    }
});

//IMPORTANT: *I have no idea what the point of this function is and it's currently broken cause it doesn't use Mongoose
app.get('/listjson', async function (req, resp) {
    try {
        //const posts = db.collection(TASKS);
        const res = await posts.find().toArray();
        resp.send(res)
    } catch (e) {
        console.error(e);
    }
});

//Deletes task using its object ID
app.delete('/delete', async function (req, resp) {
    try {
        const taskID = await (req.body._id)
        console.log(req.body._id)
        await taskModel.findOneAndDelete({ _id: taskID })
        console.log("Successfully deleted task")
    } catch (e){
        console.error(e)
        resp.status(500).send({ error: 'Error deleting task' });
    }
});

//Retrieves details for specific task
app.get('/detail/:id', async function (req, resp) {
    try {
        const taskID = await (req.params.id)
        let taskInfo = await taskModel.findOne({ _id: taskID })
        resp.render('detail.ejs', {data : taskInfo});
    } catch (e) {
        console.log(error);
        //send the error as a response
        resp.status(500).send({ error: 'Error' });
    }
})

//API that just renders the edit page for specific tasks
app.get('/update/:id', async function (req, resp) {
    try {
        const taskID = (req.params.id)
        const task = await taskModel.findOne({ _id: taskID })
        //If task exists then render the webpage
        if(task) {
            //Render edit.js with task information
            resp.render('edit.ejs', {data : task})
            console.log("Post has been found and now is being displayed")
        //If task doesn't exist then don't send an error
        } else {
            resp.status(404).send("Post doesn't exist");
        }
    } catch (e) {
        console.error(e)
        resp.status(500).send({ error: 'Error Updating task information' });
    }
});

//Update call that edits information
//update a task information and send it to the database
app.put('/update/:id', async function (req, resp) {
    try {
        //Setting task parameters
        const taskID = (req.params.id);
        const updatedTask = req.body;
        const options = { new: true };
        const task = await taskModel.findOneAndUpdate({_id: taskID}, updatedTask, options);

        if (task) {
            //Finds all tasks currently stored in the database
            const tasks = await taskModel.find().exec();
            //Creates query out of tasklist defined above
            const query = { posts: tasks };
            //renders the list page using the tasks above
            resp.render('list.ejs', query);
        } else {
            //sends the error as a response
            resp.status(404).send({ error: `Error Updating task information` });
        }
    } catch (error) {
        //display the error
        console.log(error);
        //send the error as a response
        resp.status(500).send({ error: 'Error updating post' });
    }
});
