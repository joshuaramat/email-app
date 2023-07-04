import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    // debugger;

    return (
      <StripeCheckout 
        name="Email App"
        description="$5 for 5 email credits"
        amount={500}
        token={
          token => this.props.handleToken(token)
        }
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button 
          className="btn waves-effect" 
          style={{borderRadius: "30px"}}
        >
          Get more Echoes
        </button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments);