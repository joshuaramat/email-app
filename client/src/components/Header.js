import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Payments from './Payments';

import '../styles/header.css';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li key="3">
            <span className="credits">
              Credits: {this.props.auth.credits}
            </span>
          </li>,
          <li key="1"><Payments /></li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav className='navbar blue-grey lighten-1'>
        <div className="nav-wrapper">
          <Link 
            to={this.props.auth ? '/surveys' : '/'} 
            className="brand-logo"
            style={{ 
              marginLeft: '1rem'
            }}
          >
            Email App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);