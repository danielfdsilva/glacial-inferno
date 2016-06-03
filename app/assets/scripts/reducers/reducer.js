import _ from 'lodash';
import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import * as actions from '../actions/action-types';

const sensorData = function (state = {fetching: false, fetched: false, data: null}, action) {
  switch (action.type) {
    case actions.REQUEST_SENSOR_DATA:
      console.log('REQUEST_SENSOR_DATA');
      state = _.cloneDeep(state);
      state.fetching = true;
      break;
    case actions.RECEIVE_SENSOR_DATA:
      console.log('RECEIVE_SENSOR_DATA');
      state = _.cloneDeep(state);
      state.data = action.data;
      state.fetching = false;
      state.fetched = true;
      break;
  }
  return state;
};

const histSensorData = function (state = {fetching: false, fetched: false, data: null}, action) {
  switch (action.type) {
    case actions.REQUEST_HIST_SENSOR_DATA:
      console.log('REQUEST_HIST_SENSOR_DATA');
      state = _.cloneDeep(state);
      state.fetching = true;
      break;
    case actions.RECEIVE_HIST_SENSOR_DATA:
      console.log('RECEIVE_HIST_SENSOR_DATA');
      state = _.cloneDeep(state);
      state.data = action.data;
      state.fetching = false;
      state.fetched = true;
      break;
  }
  return state;
};

export default combineReducers({
  routing: routeReducer,
  sensorData,
  histSensorData
});
