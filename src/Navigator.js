import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import getPartners from './utils';

const NoMatch = () => <p>404 - There is nothing here!</p>;

class Dashboard extends Component {
  render() {
    return (
      <div
        style={{ textAlign: 'center', backgroundColor: 'black' }}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: this.props.iframe }}
      />
    );
  }
}

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line
      parnters: [],
      error: null
    };
  }

  componentWillMount() {
    getPartners(partners => this.setState({ partners }), error => this.setState({ error }));
  }

  render() {
    if (this.state.error) return <p>{this.state.error.result.error.statusText}</p>;
    if (this.state.partners && this.state.partners.length > 0) {
      return (
        <Router>
          <Switch>
            {this.state.partners &&
              this.state.partners.map(partner => (
                <Route
                  key={partner.uri}
                  path={`/${partner.uri}`}
                  render={props => (
                    <Dashboard {...props} partners={this.state.partners} iframe={partner.iframe} />
                  )}
                />
              ))}
            <Route component={NoMatch} />
          </Switch>
        </Router>
      );
    }
    return <div className="loader" />;
  }
}

export default Navigator;
