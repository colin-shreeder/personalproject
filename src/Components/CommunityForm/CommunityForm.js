import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';


class Form extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        name: '',
        description: '',
        topics: ''
    }
}

// axios post request. Posting title, img, and content off of the req.body. Returning?? I suppose it could be returning something...if this function was getting passed down from Dashboard.js? Cause then it'd return the updated arrary of objects that'll be displayed on the dashboard. But how should it be here?  Also it's saying tp pull user id off of redux state...why tho? Does it need to go on this axios request? Sounds like the endpoint will accept a parameter. Ohhh I think it's to tie the post back to the user who posted it. But that will becoming from react redux, while title image and content will be coming off the request.body.
// It also says, once the response comes back from the server, redirect the user to the Dashboard. Is that done just with the link like below...or some other way? // All of this on lines 279-296



// function to clear/reset values. Actually is this necessary since we're linking to Dashboard when posting? I think we need to clear state or else next time you post, it'll post two things instead of one. It needs to simply add to state of what's on dashboard and then disappear from here.
resetForm = () => {
  this.setState(this.baseState)
  //reset_function();
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
      return (
        <div className="Form">
            <h1>Create a community</h1>
          <form onSubmit={this.handleSubmit}>
              <label>
                  Name:
                  <br></br>
                  <input type="text" onChange={(e) => this.handleChange(e)} name="url"/>
              </label>

              <br></br>
              <label>
                  Topics:
                  <br></br>
                  <input type="text" onChange={(e) => this.handleChange(e)} name="name"/>
              </label>
              <br></br>
              <label>
                  Description:
                  <br></br>
                  <input type="number" onChange={(e) => this.handleChange(e)} name="price"/>
              </label>
          </form>


         <Link to='/dashboard' className="links"> <button type="submit"
            onClick={(e)=>{
            this.postRequest();
            this.handleSubmit(e);
            this.resetForm()}}>
              Create Community
              </button> </Link>

            
            
        </div>
      );
    }
  }

  const mapStateToProps = state => state;
  export default connect(mapStateToProps)(Form);