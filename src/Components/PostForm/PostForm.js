import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import noimage from "../PostForm/noimage.png";


class PostForm extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        title: '',
        img: '',
        content: '',
        upvotes: 0,
        community: ''
    }
}

// axios post request. Posting title, img, and content off of the req.body. Returning?? I suppose it could be returning something...if this function was getting passed down from Dashboard.js? Cause then it'd return the updated arrary of objects that'll be displayed on the dashboard. But how should it be here?  Also it's saying tp pull user id off of redux state...why tho? Does it need to go on this axios request? Sounds like the endpoint will accept a parameter. Ohhh I think it's to tie the post back to the user who posted it. But that will becoming from react redux, while title image and content will be coming off the request.body.
// It also says, once the response comes back from the server, redirect the user to the Dashboard. Is that done just with the link like below...or some other way? // All of this on lines 279-296

createPost(title, img, content, upvotes) {
 console.log(this.state)
  axios
    .post(`/api/create`, { title, img, content, upvotes })
    .then(res => {
      // console.log(res);
      this.setState({ posts: res.data });
    })
    .then(() => {
      this.setState({
        redirect: true
      });
    })
    .catch(err => console.log(err));
    this.props.history.push('/dashboard')
}



// function to clear/reset values. Actually is this necessary since we're linking to Dashboard when posting? I think we need to clear state or else next time you post, it'll post two things instead of one. It needs to simply add to state of what's on dashboard and then disappear from here.
resetForm = () => {
  this.setState(this.baseState)
  // reset_function();
}

  
  
  handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
}

handleSubmit(e){
  e.preventDefault()
}

    render() {
      let {title, img, content, upvotes}=this.state
      return (
        <div className="Form">
            <h1>Create a post</h1>
          <form onSubmit={this.handleSubmit}>

          Choose a community: 
          <br></br>

          <select>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
          </select>

          <br></br>
              <label>
                  <br></br>
                  <input type="text" placeholder="Post Title" onChange={(e) => this.handleChange(e)} name="title"/>
              </label>

              <br/><br/>

              <img src={this.img || noimage} alt="" height="200" width="200" />
            
              <br></br>
              <label>
                  <br></br>
                  <input type="text" placeholder="Image URL" onChange={(e) => this.handleChange(e)} name="img"/>
              </label>
              <br></br>
              <label>
                
                  <br></br>
                  <input type="text" placeholder="Text (optional)" onChange={(e) => this.handleChange(e)} name="content"/>
              </label>
          </form>


         <Link to='/dashboard' className="links"> <button type="submit"
            
            onClick={(e)=>{
            this.createPost(title, img, content, upvotes);
            this.handleSubmit(e);
            this.resetForm()}}>
              Post
              </button> </Link>

            
            
        </div>
      );
    }
  }

  const mapStateToProps = state => state;
  export default connect(mapStateToProps)(PostForm);