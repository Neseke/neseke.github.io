import React, { Component } from 'react';
import Navigator from './Navigator';
import './index.css';

const CLIENT_ID = '523150784546-0oc3p34t4fo0iha2jv2tv55ke2ddj5m2.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      error: null,
      loading: false
    };

    this.authenticate = this.authenticate.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    window.gapi.load('client', () => {
      this.checkAuth(true, this.handleAuth.bind(this));
    });
  }

  authenticate(e) {
    e.preventDefault();
    this.checkAuth(false, this.handleAuth.bind(this));
  }

  checkAuth(immediate, callback) {
    window.gapi.auth.authorize(
      {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate
      },
      callback
    );
  }

  handleAuth(authResult) {
    if (authResult && !authResult.error) {
      this.setState({
        authenticated: true,
        loading: false
      });
    } else {
      this.setState({
        authenticated: false,
        loading: false
      });
    }
  }

  render() {
    if (this.state.loading) return <div className="loader" />;
    if (!this.state.error) {
      if (!this.state.authenticated) {
        return <button onClick={this.authenticate}>Login</button>;
      }
      return <Navigator />;
    }
    return <p>{this.state.error.result.error.message}</p>;
  }
}

export default App;
