const bcrypt = require('bcrypt');

module.exports = {

    getUserPosts: async (req, res) => {
      const {id} = req.params;
      const {userposts, search} = req.body;
      const db = req.app.get('db');
      
      if(userposts === true && search !== null) {
          const foundPost = db.posts.where({"title like": "%search%"})
          res.status(200).send(foundPost)
      } else if (userposts === false && search !== null) {
          const foundPost = db.posts.where({"title like": "%search%", "author_id !=": id})
          res.status(200).send(foundPost)
      } else if (userposts === false && search === null) {
          const foundPost = db.posts.where({"author_id !=": id})
          res.status(200).send(foundPost)
      } else {
          const posts = await db.get_user_posts();
          res.status(200).send(posts);
      }
  },

  getAllPosts: async (req, res, next) => {
    const db = req.app.get("db");
  
    db.get_all_posts()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
  },


delete: ( req, res, next ) => {
  const dbInstance = req.app.get('db');
  const { postid } = req.params;

  dbInstance.delete( postid )
    .then( (response) => res.status(200).send(response) )
    .catch( err => {
      res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
      console.log(err)
    } );
},

createPost: (req, res, next) => { 
  let author_id = req.session.user.userid;
  let { title, img, content, upvotes } = req.body;
  const db = req.app.get("db");

  db.create_post([title, img, content, author_id, upvotes])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
  },

  createCommunity: (req, res, next) => { 
    let { name, description, topics } = req.body;
    const db = req.app.get("db");
  
    db.create_community([name, description, topics])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
    },

  getPost: (req,res,next) => {
  let { postid } = req.params;
  const db = req.app.get("db");

  db.get_by_id([postid])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
  },

  updatePost: (req, res, next) => {
    let { title, content } = req.body;
    let {postid} = req.params;
  
    console.log(title, content, postid);
    const db = req.app.get("db");
  
    db.update_post([title, content, postid])
      .then(response => {
        console.log(response)
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
  },

  upvote: (req, res, next) => {
    let {postid, upvotes} = req.params;
    const db = req.app.get("db");

    db.upvote(upvotes, postid)
    .then (response => {
      res.status(200).send(response);
    })    


  },

  downvote: (req, res, next) => {
    let {postid, upvotes} = req.params;
    const db = req.app.get("db");

    db.downvote(upvotes, postid)
    .then (response => {
      res.status(200).send(response);
    })  
    
  }
}