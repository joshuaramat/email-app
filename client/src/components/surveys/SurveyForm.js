import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from "react-router-dom";
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({label, name}) => {
      return (
        <Field 
          key={name} 
          component={SurveyField} 
          type="text" 
          label={label} 
          name={name} 
        />
      )
    })
  }

  render() {
    return (
      <div>
        <h2>Create a New Echo</h2>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <div className='btn-container'>
            <Link
              to="/surveys"
              className='grey btn-flat white-text waves-effect'
              style={{
                borderRadius: "10px"
              }}
            >
              <i className='material-icons'>cancel</i>
            </Link>
            <button 
            type='submit'
            className='teal btn-flat right white-text waves-effect'
            style={{
              borderRadius: "10px",
              padding: "0 2rem"
            }}
            >
              Continue To Review
              <i className='material-icons right'>done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.recipients || '');

  _.each(formFields, ({name}) => {
    if (!values[name]) {
      errors[name] = (
        name === 'recipients' ? 
        `Please enter at least 1 ${name}.` : 
        `Please enter a ${name}.`
      );
    }
  })

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
