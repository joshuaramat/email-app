import React from 'react'

import '../../styles/surveyFormField.css';

const SurveyField = ({ input, label, meta: {error, touched} }) => {
  return (
    <div className='field-container'>
      <label className='field-label'>{label}</label>
      <input className='input-field' {...input} />
      <div className='error-text'>
        {touched && error}
      </div>
    </div>
  )
}

export default SurveyField