import React from 'react';

import '../styles/footer.css';
import logo from '../assets/icons/echo_pulse.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <a 
        href="/auth/google" 
        className='footer-cta'
      >
        Start an echo today!
      </a>
      <img 
        src={logo} 
        alt="EchoPulse logo" 
        className="footer-logo" 
      />
      <p className="copyright">
        &copy; {currentYear} EchoPulse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
