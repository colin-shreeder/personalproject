import React, { Component } from 'react';
import axios from 'axios';
import {getUser} from '../../Redux/reducer'
import {connect} from 'react-redux';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedInUser: {}
    };
  }

  async login() {
    let { email, password } = this.state;
    let res = await axios.post('/auth/login', {
      email,
      password
    });
    this.props.getUser();
    this.setState({ 
      loggedInUser: res.data, 
      email: '', 
      password: '' });
  }

  async signup() {
    let { email, password } = this.state;
    let res = await axios.post('/auth/register', {
      email,
      password
    });
    this.props.getUser();
    this.setState({ 
      loggedInUser: res.data, 
      email: '', 
      password: '' });
  }

  async logout() {
    axios.get('/auth/logout');
    this.setState({ loggedInUser: {} });
  }

  render() {
    let { loggedInUser, email, password } = this.state;
    return (
      <div className="form-container done">
        <div className="login-form">
          <h3>Auth w/ Bcrypt</h3>
          <div>
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              value={password}
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="password"
            />
          </div>
          {loggedInUser.email ? (
            <button onClick={() => this.logout()}>Logout</button>
          ) : (
            <button onClick={() => this.login()}>Login</button>
          )}
          <button onClick={() => this.signup()}>Sign up</button>
        </div>

        <hr />

        <h4>Status: {loggedInUser.email ? 'Logged In' : 'Logged Out'}</h4>
        <h4>User Data:</h4>
        <p> {loggedInUser.email ? JSON.stringify(loggedInUser) : 'No User'} </p>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => state;
  console.log(mapStateToProps)

  export default connect(null, {getUser})(Auth);
