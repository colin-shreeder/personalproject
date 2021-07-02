import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'
import '../Nav/Nav.css'
import redditlogo from "../Nav/redditlogo.png";


class Nav extends Component {

  constructor() {
    super();
    this.state = {
      userid: '',
      username: '',
      communities: [],
      community: ''
    }
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

  communityChange(e){
    this.setState({
        community: e.target.value
    })
  }
    

  handleclicklogout() {
    axios.post(`/api/auth/logout`).then(res => {
      // console.log(res);
      this.setState({ userid: "", username: "" });
    });
  }

    render() {
      let {community}=this.state
      
      console.log(community)
      return (
        
        <div className="nav">

            
            
              <Link to='/dashboard' className="links">
              <img src={redditlogo} className="reddit" alt="" height="50" width="50" />
              </Link>

              <Link to='/dashboard' className="links"> <p>HOME</p> </Link>

              <Link to='/submit' className="links"> <p>CREATE POST</p>  </Link>

              <Link to='/submit_community' className="links"> <p> CREATE COMMUNITY </p>  </Link>

              <Link to='/' className="links"  onClick={() => this.handleclicklogout()}>  <p>LOGOUT</p> </Link>
            

        </div>
      );
    }
  }

  const mapStateToProps = state => state;
export default connect(mapStateToProps)(Nav);