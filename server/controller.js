const bcrypt = require('bcrypt');

module.exports = {

  getAllPosts: async (req, res, next) => {
    const db = req.app.get("db");
  console.log('test')
    db.get_all_posts()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send(err)
      }
);
  },

  getCommunityPosts: async (req, res, next) => {
    const db = req.app.get("db");
    let community = this.props.match.params.community;
  console.log('test')
    db.get_by_id(community)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send(err)
      }
);
  },

  getTopPosts: async (req, res, next) => {
    const db = req.app.get("db");
  console.log('test')
    db.get_top_posts()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send(err)
      }
);
  },

  getBottomPosts: async (req, res, next) => {
    const db = req.app.get("db");
  console.log('test')
    db.get_bottom_posts()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send(err)
      }
);
  },

  getAllCommunities: async (req, res, next) => {
    const db = req.app.get("db");
  
    db.get_all_communities()
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
  let { title, img, content, upvotes, community} = req.body;
  const db = req.app.get("db");
  console.log(req.session.user)
  console.log (author_id, +community, upvotes)

  db.create_post([title, img, content, author_id, upvotes, +community])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err =>{ 
      console.log(err)
      res.status(500).send(err);
  })},

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
      console.log(response)
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