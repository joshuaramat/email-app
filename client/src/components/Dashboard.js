import React from 'react'
import { Link } from 'react-router-dom'


const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className='fixed-action-btn'>
        <Link to='/surveys/new' className='btn-container'>
          <button 
            className="btn waves-effect btn-large" 
            style={{borderRadius: "30px"}}
          >
            Start an Echo
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard