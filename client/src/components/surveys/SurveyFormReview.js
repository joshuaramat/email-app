import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import formFields from './formFields'
import * as actions from '../../actions'

const SurveyFormReview = ({ 
  onCancel, 
  formValues, 
  submitSurvey, 
  history, 
}) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h3>Please confirm your entries</h3>
      {reviewFields}
      <button
        className='grey btn-flat white-text waves-effect'
        onClick={onCancel}
        style={{
          borderRadius: "10px"
        }}
      >
        <i className='material-icons'>backspace</i>
      </button>
      <button
        className='teal btn-flat white-text waves-effect'
        onClick={() => submitSurvey(formValues, history)}
        style={{
          borderRadius: "10px"
        }}
      >
        Send
        <i className='material-icons right'>email</i>
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))