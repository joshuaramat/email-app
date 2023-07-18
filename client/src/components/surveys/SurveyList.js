import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import '../../styles/surveyList.css';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (this.props.surveys.length === 0) {
      return <div className='card'>No surveys to display</div>;
    }

    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card small" key={survey._id}>
          <div className="card-content">
            <h3 className="card-title">{survey.title}</h3>
            <h4 className='center'>{survey.body}</h4>
            <p className="right bottom">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div 
            className="card-action center teal lighten-2"
            style={{borderRadius: "0 0 20px 20px"}}
          >
            <div>Yes: {survey.yes}</div>
            <div>No: {survey.no}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='container'>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
