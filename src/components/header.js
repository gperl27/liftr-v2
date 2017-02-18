import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks(){
    if(this.props.authenticated){
      // show a link to sign out
      return <li className="nav-item">
                <Link className="nav-link" to="/signout">Sign Out</Link>
              </li>;
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Register</Link>
        </li>
      ];
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Liftr</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
