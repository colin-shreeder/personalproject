require ('dotenv').config();
const express = require("express");
const massive = require('massive');
const app = express();
const controller = require("./controller");
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authController = require("./authcontroller");


app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  }).then( db => {
    app.set("db", db)
    console.log("Well, that's like... your opinion... man")
  })



app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.post('/api/auth/logout', authController.logout);


app.post('/api/create', controller.createPost);
app.get('/api/posts', controller.getAllPosts);
app.post('/api/posts/:userid', controller.getUserPosts);
app.delete('/api/post/:postid', controller.delete);
app.get('/api/post/:postid', controller.getPost);






app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  });