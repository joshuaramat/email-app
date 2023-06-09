import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Payments from './Payments';

import '../styles/header.css';
import logo from '../assets/icons/echo_pulse.svg'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className='navbar-button'>
            <a 
              href="/auth/google"
              className="login-button"
            >
              Sign in with Google
            </a>
          </li>
        );
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
      <nav className="navbar darken-4">
        <div className="nav-wrapper">
          <Link 
            to={this.props.auth ? '/surveys' : '/'} 
            className="brand-logo left"
          >
            <img src={logo} alt="logo" className="logo" />
            <span className="brand-name">
              EchoPulse
              <span className='beta'>
                beta
              </span>
            </span>
          </Link>
          <ul id="nav-mobile" className="right">
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
