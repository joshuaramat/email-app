import React from 'react';
import '../styles/landing.css';
import hero from '../assets/images/hero.jpg';

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='hero'>
        <div className='text-container'>
          <h1 className='hero-headline'>
            <span className='gradient'>Empower</span> Your Growth With Echoing Insights.
          </h1> 
          <p className='hero-text'>
            Resonate with your users at scale. EchoPulse helps you reach out en masse, collect meaningful feedback, and amplify your product’s resonance. Tune in to your users' needs, today!
          </p>
          <a 
            href="/auth/google" 
            className='cta-button'
          >
            Get started with Google
          </a>
        </div>
        <img 
          src={hero} 
          alt='hero'
          className='hero-image'
        />
      </div>
    </div>
  )
}

export default Landing