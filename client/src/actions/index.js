import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
  try {
      const res = await axios.get('/api/current_user');

      dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
      console.error(`Error fetching the user: ${error}`);
  }
};

export const handleToken = token => async dispatch => {
  try {
      const res = await axios.post('/api/stripe', token);

      dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
      console.error(`Error handling the token: ${error}`);
  }
}

export const submitSurvey = (values, history) => async dispatch => {
  try{
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');

    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.error(`Error submitting the survey: ${error}`);
  }
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};