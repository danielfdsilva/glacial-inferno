'use strict';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchSensorData } from '../actions/action-creators';
import SensorWidget from '../components/sensor-widget';

var Home = React.createClass({
  displayName: 'Home',

  propTypes: {
    _requestSensorData: React.PropTypes.func,
    sensorData: React.PropTypes.shape({
      fetched: React.PropTypes.bool,
      fetching: React.PropTypes.bool,
      data: React.PropTypes.object
    })
  },

  _fetchInterval: null,
  // In seconds.
  _fetchRate: 600, // 10 min

  prepareData: function () {
    let data = _.values(this.props.sensorData.data);

    let startToday = new Date();
    startToday.setHours(0);
    startToday.setMinutes(0);
    startToday.setSeconds(0);

    startToday = Math.floor(startToday.getTime() / 1000);
    let startYesterday = startToday - (60 * 60 * 24);
    // Discard data older than 3 days.
    let daysAgo = startToday - (60 * 60 * 24 * 3);

    let tempAll = [];
    let tempToday = [];
    let tempYesterday = [];
    let humAll = [];
    let humToday = [];
    let humYesterday = [];
    _.forEach(data, o => {
      let t = {
        timestep: new Date(o.time * 1000),
        value: o.data.t
      };
      let h = {
        timestep: new Date(o.time * 1000),
        value: o.data.h
      };
      if (o.time >= daysAgo) {
        tempAll.push(t);
        humAll.push(h);
      }
      if (o.time >= startToday) {
        tempToday.push(t);
        humToday.push(h);
      }
      if (o.time < startToday && o.time >= startYesterday) {
        tempYesterday.push(t);
        humYesterday.push(h);
      }
    });

    return {
      // Temperature.
      temp: {
        data: tempAll,
        last: _.last(tempAll) || null,
        avgs: {
          today: _.meanBy(tempToday, 'value'),
          yesterday: _.meanBy(tempYesterday, 'value')
        }
      },
      // Humidity.
      hum: {
        data: humAll,
        last: _.last(humAll) || null,
        avgs: {
          today: _.meanBy(humToday, 'value'),
          yesterday: _.meanBy(humYesterday, 'value')
        }
      }
    };
  },

  fetchData: function () {
    this.props._requestSensorData();
  },

  componentDidMount: function () {
    this.fetchData();
    this._fetchInterval = setInterval(() => {
      this.fetchData();
    }, this._fetchRate * 1000);
  },

  componentWillUnmount: function () {
    if (this._fetchInterval) {
      clearInterval(this._fetchInterval);
    }
  },

  render: function () {
    let { fetched, fetching } = this.props.sensorData;

    let { temp, hum } = this.prepareData();

    return (
      <section className='page'>
        <header className='page__header'>
          <div className='inner'>
            <div className='page__headline'>
              <h1 className='page__title'>Home Page</h1>
            </div>
          </div>
        </header>
        <div className='page__body'>

          <section className='page__content'>
            <div className='inner'>

              <SensorWidget
                className='card--temp'
                fetching={fetching}
                fetched={fetched}
                title='Temperature'
                lastReading={temp.last}
                avgs={temp.avgs}
                plotData={temp.data}
                axisLineMax={35}
                axisLineVal={20}
                axisLineMin={10}
                numDaysVisible={1}
                unit=' ºC'
              />

              <SensorWidget
                className='card--hum'
                fetching={fetching}
                fetched={fetched}
                title='Humidity'
                lastReading={hum.last}
                avgs={hum.avgs}
                plotData={hum.data}
                axisLineMax={100}
                axisLineVal={50}
                axisLineMin={25}
                numDaysVisible={1}
                unit=' %'
              />

            </div>
          </section>
        </div>
      </section>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

function selector (state) {
  return {
    sensorData: state.sensorData
  };
}

function dispatcher (dispatch) {
  return {
    _requestSensorData: () => dispatch(fetchSensorData())
  };
}

module.exports = connect(selector, dispatcher)(Home);
