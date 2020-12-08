const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        const [foundUser] = await db.check_user_exists(email);
        if (foundUser){
          res.status(404).send('Email already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [createUser] = await db.create_user([email, hash]);
        req.session.user = {
          id: createUser.id,
          email: createUser.email
        }
        res.status(200).send(req.session.user);
    },

    getPosts: async (req, res) => {
      const {id} = req.params;
      const {userposts, search} = req.query;
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
          const posts = await db.get_posts();
          res.status(200).send(posts);
      }
  },

  getPost: async (req, res) => {
    const {postid} = req.params;
    const db = req.app.get('db');

    const singlePost = await db.get_post(postid)
    if (singlePost) {
        res.status(200).send(singlePost[0])
    } else {
        res.status(404).send("Oops! We cannot display posts at this time.")
    }
},

logout: (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
},

delete: ( req, res, next ) => {
  const dbInstance = req.app.get('db');
  const { id } = req.params;

  dbInstance.delete( id )
    .then( (inventory) => res.status(200).send(inventory) )
    .catch( err => {
      res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
      console.log(err)
    } );
}
}