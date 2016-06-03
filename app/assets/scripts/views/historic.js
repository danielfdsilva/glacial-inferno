'use strict';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchHistSensorData } from '../actions/action-creators';
import SensorWidget from '../components/sensor-widget';

var Historic = React.createClass({
  displayName: 'Historic',

  propTypes: {
    _requestHistSensorData: React.PropTypes.func,
    histSensorData: React.PropTypes.shape({
      fetched: React.PropTypes.bool,
      fetching: React.PropTypes.bool,
      data: React.PropTypes.array
    })
  },

  _fetchInterval: null,
  // In seconds.
  _fetchRate: 600, // 10 min

  prepareData: function () {
    let data = _.values(this.props.histSensorData.data);

    let startToday = new Date();
    startToday.setHours(0);
    startToday.setMinutes(0);
    startToday.setSeconds(0);

    startToday = Math.floor(startToday.getTime() / 1000);
    let startYesterday = startToday - (60 * 60 * 24);
    // Discard data older than 3 days.

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

      tempAll.push(t);
      humAll.push(h);

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
    this.props._requestHistSensorData();
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
    let { fetched, fetching } = this.props.histSensorData;

    let { temp, hum } = this.prepareData();

    return (
      <section className='page'>
        <header className='page__header'>
          <div className='inner'>
            <div className='page__headline'>
              <h1 className='page__title'>Historic Page</h1>
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
                title='Historic Temperature'
                lastReading={temp.last}
                avgs={temp.avgs}
                plotData={temp.data}
                axisLineMax={35}
                axisLineVal={20}
                axisLineMin={10}
                numDaysVisible={7}
                unit=' ºC'
              />

              <SensorWidget
                className='card--hum'
                fetching={fetching}
                fetched={fetched}
                title='Historic Humidity'
                lastReading={hum.last}
                avgs={hum.avgs}
                plotData={hum.data}
                axisLineMax={100}
                axisLineVal={50}
                axisLineMin={25}
                numDaysVisible={7}
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
    histSensorData: state.histSensorData
  };
}

function dispatcher (dispatch) {
  return {
    _requestHistSensorData: () => dispatch(fetchHistSensorData())
  };
}

module.exports = connect(selector, dispatcher)(Historic);
