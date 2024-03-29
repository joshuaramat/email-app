import React from 'react'
import { Link } from 'react-router-dom'
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div className='container'>
      <h1 className='center'>Active Echoes</h1>
      <SurveyList />
      <div className='fixed-action-btn'>
        <Link to='/surveys/new' className='btn-container'>
          <button 
            className="btn waves-effect btn-large" 
            style={{borderRadius: "10px"}}
          >
            Start an Echo
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard