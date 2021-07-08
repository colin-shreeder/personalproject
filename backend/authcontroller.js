const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        const [foundUser] = await db.check_user_exists(username);
        
        
        if (foundUser){
          res.status(409).send('Username already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [createUser] = await db.create_user([username, hash]);
        req.session.user = {
          id: createUser.id,
          username: createUser.username
        }
        res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
      const db = req.app.get('db');
      const { username, password } = req.body;
      const [foundUser] = await db.check_user(username);
      if(!foundUser){
          return res.status(401).send("Incorrect login information")
      }
      const authenticated = bcrypt.compareSync(password, foundUser.password);
      if( authenticated ){
          req.session.user = {
              userid: foundUser.id,
              username: foundUser.username
          }
          res.status(200).send(req.session.user);
      } 
      
  },

      logout: (req, res) => {
        req.session.destroy
        res.status(200)
      }







}