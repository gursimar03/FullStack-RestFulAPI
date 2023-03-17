import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { SERVER_HOST } from '../config/global_constants';
import ScrollToTop from '../ScrollToTop';

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      success: false,
    };
  }


  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    axios.delete(`${SERVER_HOST}/users/delete-account/${this.state.email}`, { data: { password: this.state.password } })
      .then(response => {
        this.setState({ success: true, error: '' });
      })
      .then(
        localStorage.clear()
      )
      .catch(error => {
        this.setState({ error: error.response.data.message });
      });
  }



  render() {
    if (this.state.success) {
      return <p>Your account has been deleted.</p>;
    }

    return (
      <form onSubmit={this.handleSubmit} class="delete-account-page">
        <ScrollToTop />
        <div class="form-group">
          <label for="email-input">Email</label>
          <input id="email-input" type="email" value={this.state.email} onChange={this.handleEmailChange} />
        </div>
        <div class="form-group">
          <label for="password-input">Password</label>
          <input id="password-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <div class="form-group">
          <button type="submit">Delete Account</button>
        </div>
        {this.state.error && <div class="error-message">{this.state.error}</div>}
        <Link to="/" class="cancel-link">Cancel</Link>
      </form>

    );
  }
}

export default DeleteAccount;
