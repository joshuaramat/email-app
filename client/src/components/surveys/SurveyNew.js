import React, { Component } from 'react';
import SurveyForm from './SurveyForm';

class SurveyNew extends Component {
  render() {
    return (
      <div>
        <h4>This is a new survey</h4>
        <SurveyForm />
      </div>
    );
  }
}

export default SurveyNew;