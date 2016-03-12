import fetch from 'isomorphic-fetch';
import * as actions from './action-types';
import config from '../config';

// //////////////////////////////////////////////////////////////////////////
// // Fetch Section Access Thunk

function requestSensorData () {
  return {
    type: actions.REQUEST_SENSOR_DATA
  };
}

function receiveSensorData (json) {
  return {
    type: actions.RECEIVE_SENSOR_DATA,
    data: json,
    receivedAt: Date.now()
  };
}

export function fetchSensorData () {
  return dispatch => {
    dispatch(requestSensorData());

    return fetch(`${config.firebaseSource}/climate-hdc.json`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(json => {
        dispatch(receiveSensorData(json));
      })
      .catch(e => {
        throw e;
      });
  };
}
