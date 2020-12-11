import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'


class Nav extends Component {

  handleclicklogout() {
    axios.post(`/api/auth/logout`).then(res => {
      // console.log(res);
      this.setState({ userid: "", username: "" });
    });
  }

    render() {
      return (
        <div className="Nav">

            <h1>Nav</h1>

            <Link to='/dashboard' className="links"> <button> Home </button> </Link>

            <select>
              <option selected value="home">Home</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
          </select>

            <input type="text" placeholder="Search"/>

            <Link to='/submit' className="links"> <button> Create Post </button> </Link>

            <Link to='/submit_community' className="links"> <button> Create Community </button> </Link>

            <Link to='/' className="links"> <button onClick={() => this.handleclicklogout()}> Logout </button> </Link>
            
        </div>
      );
    }
  }

  const mapStateToProps = state => state;
export default connect(mapStateToProps)(Nav);