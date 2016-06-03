import fetch from 'isomorphic-fetch';
import * as actions from './action-types';
import config from '../config';

// //////////////////////////////////////////////////////////////////////////
// // Fetch Sensor Data Thunk

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

// //////////////////////////////////////////////////////////////////////////
// // Fetch Historic Sensor Data Thunk

function requestHistSensorData () {
  return {
    type: actions.REQUEST_HIST_SENSOR_DATA
  };
}

function receiveHistSensorData (json) {
  return {
    type: actions.RECEIVE_HIST_SENSOR_DATA,
    data: json,
    receivedAt: Date.now()
  };
}

export function fetchHistSensorData () {
  return dispatch => {
    dispatch(requestHistSensorData());

    return fetch(`${config.firebaseSource}/climate-historic.json`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(json => {
        dispatch(receiveHistSensorData(json));
      })
      .catch(e => {
        throw e;
      });
  };
}
