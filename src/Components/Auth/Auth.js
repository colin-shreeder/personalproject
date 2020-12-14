import React, { Component } from 'react';
import axios from 'axios';
import {getUser} from '../../Redux/reducer'
import {connect} from 'react-redux';
import '../Auth/Auth.css'


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedInUser: {}
    };
  }

  async login() {
    let { username, password } = this.state;
    await axios.post('/auth/login', {
      username,
      password
    });
    this.props.getUser();
    this.props.history.push('/dashboard')
  }

  async signup() {
    let { username, password } = this.state;
    let res = await axios.post('/auth/register', {
      username,
      password
    });
    this.props.getUser();
    this.setState({ 
      loggedInUser: res.data, 
      username: '', 
      password: '' });
      this.props.history.push('/dashboard')
  }

  async logout() {
    axios.get('/auth/logout');
    this.setState({ loggedInUser: {} });
  }

  render() {
    let { loggedInUser, username, password } = this.state;
    return (
      <div className="form-container">
        <div className="login-form">
          
        
          <h3>shreddit</h3>
          
            <input
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
              type="text"
              placeholder="Username"
            />
          
          
            <input
              value={password}
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Password"
            />
            <br></br>
          {loggedInUser.username ? (
            <button onClick={() => this.logout()}>Logout</button>
          ) : (
            <button onClick={() => this.login()}>Login</button>
          )}
          <button onClick={() => this.signup()}>Sign up</button>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => state;
  console.log(mapStateToProps)

  export default connect(null, {getUser})(Auth);
