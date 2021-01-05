import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import noimage from "../PostForm/noimage.png";
import '../PostForm/PostForm.css';


class PostForm extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        title: '',
        img: '',
        content: '',
        upvotes: 0,
        communities: [],
        community: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.communityChange = this.communityChange.bind(this);
}

componentDidMount() {
  this.getAllCommunities();
}

getAllCommunities = () => {
  axios.get(`/api/getcommunities`).then((res) => {
    this.setState({
      communities: res.data,
    });
  });
};

// axios post request. Posting title, img, and content off of the req.body. Returning?? I suppose it could be returning something...if this function was getting passed down from Dashboard.js? Cause then it'd return the updated arrary of objects that'll be displayed on the dashboard. But how should it be here?  Also it's saying tp pull user id off of redux state...why tho? Does it need to go on this axios request? Sounds like the endpoint will accept a parameter. Ohhh I think it's to tie the post back to the user who posted it. But that will becoming from react redux, while title image and content will be coming off the request.body.
// It also says, once the response comes back from the server, redirect the user to the Dashboard. Is that done just with the link like below...or some other way? // All of this on lines 279-296

createPost(title, img, content, upvotes, community) {
 console.log(this.state)
  axios
    .post(`/api/create/`, { title, img, content, upvotes, community })
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


  
  
  handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
}

communityChange(e){
  this.setState({
      community: e.target.value
  })
}

handleSubmit(e){
  e.preventDefault()
}

    render() {
      let {title, img, content, upvotes,community}=this.state
      let communityOptions = this.state.communities.map((e) => {
        return (
          <option value={e.id}> {e.name} </option>
        )
      })
      console.log(community)
      return (
        <div className="Form">
          <div className="header">
            <h1>Create a post</h1>
          </div>

        <div className='dropdown'>
          <div className='custom-select'>
            <select onChange={(e) => this.communityChange(e)}>
              <option selected value="">
                Choose a Community
              </option>
                {communityOptions}
            </select>
          </div>
        </div>
      <div className='bigbox'>
        <div class='formbox'>
          <form onSubmit={this.handleSubmit}>
              <label className='label'>
                  <input className="inputsone" type="text" placeholder="Post Title" onChange={(e) => this.handleChange(e)} name="title"/>
              </label>
              <br></br>
              <label>
                    <input className="inputsone" type="text" placeholder="Image URL (optional)" onChange={(e) => this.handleChange(e)} name="img"/>
              </label>
                <br></br>
                <br></br>
              <label> 
              
                  <textarea className="inputstwo" placeholder="Text (optional)" cols="50" rows="10" name="content" onChange={(e) => this.handleChange(e)} ></textarea>
              </label>

              <br></br>

              <Link to='/dashboard'> 
                <button type="submit"onClick={(e)=>{
                  this.createPost(title, img, content, upvotes, community);
                  this.handleSubmit(e);}}>
                    Post
                </button> 
              </Link>
          </form>
          
        </div>

        <div className='lowerbox'>
            <img src={this.img || noimage} alt="" height="300" width="300" />
          
        </div>
      </div>

            
            
        </div>
      );
    }
  }

  const mapStateToProps = state => state;
  export default connect(mapStateToProps)(PostForm);