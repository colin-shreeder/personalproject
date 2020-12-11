import React, { Component } from 'react';
import axios from 'axios';
import {getUser} from '../../Redux/reducer'
import {connect} from 'react-redux';

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
      <div className="form-container done">
        <div className="login-form">
          <h3>Shreddit</h3>
          <div>
            <input
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              value={password}
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Password"
            />
          </div>
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
