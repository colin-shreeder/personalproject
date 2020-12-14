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
                  <input type="text" placeholder="Name of your community" onChange={(e) => this.handleChange(e)} name="name"/>
              </label>

              <br></br>
              <label>
                  Topics:
                  <br></br>
                  <input type="text" placeholder="Related topics" onChange={(e) => this.handleChange(e)} name="topics"/>
              </label>
              <br></br>
              <label>
                  Description:
                  <br></br>
                  <input type="number" placeholder="What your community is about" onChange={(e) => this.handleChange(e)} name="description"/>
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