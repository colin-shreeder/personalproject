const myEnv =  require ('dotenv').config();
const express = require("express");
const massive = require('massive');
const app = express();
const controller = require("./controller");
const session = require('express-session')
const { PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authController = require("./authcontroller");
const path = require('path');

///this is a change
//////////////////////
// i'm writing some code here...
// changes here

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
    app.set("db", db);
    //console.log(db);
    console.log("Well, that's like... your opinion... man")
  })


///////////////////////


app.use(express.static(__dirname + '/../build'))

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });  



///////////////////////
// END POINTS //
///////////////////////


//AUTHENTICATION
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.post('/api/auth/logout', authController.logout);


//CREATE
app.post('/api/create', controller.createPost);
app.post('/api/comment', controller.createComment);
app.post('/api/createcommunity', controller.createCommunity);

//READ
app.get('/api/posts', controller.getAllPosts);
app.get('/api/post/:postid', controller.getPost);
app.get('/api/topposts', controller.getTopPosts);
app.get('/api/bottomposts', controller.getBottomPosts);
app.get('/api/getcommunities', controller.getAllCommunities);
app.get('/api/posts/:communityid', controller.getCommunityPosts);
app.get('/api/getcomments/:postid', controller.getComments);

//UPDATE
app.put("/api/edit/:postid", controller.updatePost);
app.put("/api/upvote/:postid/:upvotes", controller.upvote);
app.put("/api/downvote/:postid/:upvotes", controller.downvote);

//DELETE
app.delete('/api/post/:postid', controller.delete);


//////////////////////
