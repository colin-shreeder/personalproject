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
      community: ['Lime', 'Coconut', 'Grape', 'Banana']
    };
  }
    

  handleclicklogout() {
    axios.post(`/api/auth/logout`).then(res => {
      // console.log(res);
      this.setState({ userid: "", username: "" });
    });
  }

    render() {
      let options = this.state.community.map((e,index) => {
        return (
          <option value={e}> {e} </option>
        )
      })
      return (
        <div className="nav">

            <div className="navelements">
            <Link to='/dashboard' className="links"> <button> Home </button> </Link>

            <select>
              <option selected value="home">Home</option>
              {options}
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