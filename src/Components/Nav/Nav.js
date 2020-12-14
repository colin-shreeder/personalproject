import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'
import '../Nav/Nav.css'


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
      
      let communityOptions = this.state.communities.map((e) => {
        return (
          <option value={e.id}> {e.name} </option>
        )
      })
      console.log(community)
      return (
        <div className="nav">

            <div className="navelements">
            <Link to='/dashboard' className="links"> <button> Home </button> </Link>

            Selected Community:
            <select onChange={(e) => this.communityChange(e)}>
            <option selected value="home">All</option>
              {communityOptions}
            </select>

            <input type="text" placeholder="Search"/>

            <Link to='/submit' className="links"> <button> Create Post </button> </Link>

            <Link to='/submit_community' className="links"> <button> Create Community </button> </Link>

            <Link to='/' className="links"> <button onClick={() => this.handleclicklogout()}> Logout </button> </Link>
            </div>
        </div>
      );
    }
  }

  const mapStateToProps = state => state;
export default connect(mapStateToProps)(Nav);