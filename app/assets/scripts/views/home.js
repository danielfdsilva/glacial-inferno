'use strict';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ChartLine from '../components/charts/chart-line';
import { fetchSensorData } from '../actions/action-creators';

function numDisplay (n, dec, suffix = '', nan = '--') {
  if (isNaN(n)) {
    return nan;
  }
  let s = n.toString();
  s = (s.indexOf('.') === -1) ? s : s.substr(0, s.indexOf('.') + dec + 1);
  return s + suffix;
}

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

  prepareData: function () {
    if (!this.props.sensorData.fetched) {
      return null;
    }
    let data = _.values(this.props.sensorData.data);

    let startToday = new Date();
    startToday.setHours(0);
    startToday.setMinutes(0);
    startToday.setSeconds(0);

    startToday = Math.floor(startToday.getTime() / 1000);
    let startYesterday = startToday - (60 * 60 * 24);

    let temp = [];
    let hum = [];
    let temp2 = [];
    let hum2 = [];
    _.forEach(data, o => {
      if (o.time >= startToday) {
        temp.push({
          timestep: new Date(o.time * 1000),
          value: o.data.t
        });
        hum.push({
          timestep: new Date(o.time * 1000),
          value: o.data.h
        });
      } else if (o.time < startToday && o.time >= startYesterday) {
        temp2.push({
          timestep: new Date(o.time * 1000),
          value: o.data.t
        });
        hum2.push({
          timestep: new Date(o.time * 1000),
          value: o.data.h
        });
      }
    });

    let avgs = {
      today: {
        t: _.sumBy(temp, 'value') / temp.length,
        h: _.sumBy(hum, 'value') / hum.length
      },
      yesterday: {
        t: _.sumBy(temp2, 'value') / temp2.length,
        h: _.sumBy(hum2, 'value') / hum2.length
      }
    };

    let last = _.last(data);
    last = {
      timestep: new Date(last.time * 1000),
      t: last.data.t,
      h: last.data.h
    };

    return {
      temp,
      hum,
      last,
      avgs
    };
  },

  formatDate: function (date) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hour = date.getHours();
    hour = hour < 10 ? `0${hour}` : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? `0${minute}` : minute;
    return `${months[date.getMonth()]} ${date.getDate()}, ${hour}:${minute}`;
  },

  componentDidMount: function () {
    this.props._requestSensorData();
  },

  render: function () {
    let { fetched, fetching } = this.props.sensorData;

    if (!fetched && !fetching) {
      return null;
    }

    let data = this.prepareData();

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

              <article className='card card--temp'>
                <header className='card__header'>
                  <div className='card__headline'>
                    <h1 className='card__title'>Temperature</h1>
                    <dl className='stats'>
                      <dd className='stats__label'>Last update</dd>
                      <dt className='stats__date'>{data !== null ? this.formatDate(data.last.timestep) : '--'}</dt>
                      <dd className='stats__label'>Current temperature</dd>
                      <dt className='stats__value'>{data !== null ? numDisplay(data.last.t, 1) : '--'} ºC</dt>
                    </dl>
                  </div>
                </header>
                <div className='card__body'>
                  <div className='infographic'>
                    {data !== null ? (
                    <div className='line-chart-wrapper'>
                      <ChartLine
                        className='line-chart'
                        axisLineVal={20}
                        axisLineMax={35}
                        axisLineMin={10}
                        dataUnitSuffix=' ºC'
                        data={data.temp} />
                    </div>
                    ) : null}
                    {fetching ? <p className='card__loading'>Loading Data...</p> : null}
                  </div>
                  <div className='metrics'>
                    <ul className='metrics__list'>
                      <li><strong>{data !== null ? numDisplay(data.avgs.today.t, 1, ' ºC') : '--'}</strong> avg today</li>
                      <li><strong>{data !== null ? numDisplay(data.avgs.yesterday.t, 1, ' ºC') : '--'}</strong> avg yesterday</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className='card card--hum'>
                <header className='card__header'>
                  <div className='card__headline'>
                    <h1 className='card__title'>Humididty</h1>
                    <dl className='stats'>
                      <dd className='stats__label'>Last update</dd>
                      <dt className='stats__date'>{data !== null ? this.formatDate(data.last.timestep) : '--'}</dt>
                      <dd className='stats__label'>Current humididty</dd>
                      <dt className='stats__value'>{data !== null ? numDisplay(data.last.h, 1) : '--'} %</dt>
                    </dl>
                  </div>
                </header>
                <div className='card__body'>
                  <div className='infographic'>
                    {data !== null ? (
                    <div className='line-chart-wrapper'>
                      <ChartLine
                        className='line-chart'
                        axisLineVal={50}
                        axisLineMax={100}
                        axisLineMin={25}
                        dataUnitSuffix='%'
                        data={data.hum} />
                    </div>
                    ) : null}
                    {fetching ? <p className='card__loading'>Loading Data...</p> : null}
                  </div>
                  <div className='metrics'>
                    <ul className='metrics__list'>
                      <li><strong>{data !== null ? numDisplay(data.avgs.today.h, 1, '%') : '--'}</strong> avg today</li>
                      <li><strong>{data !== null ? numDisplay(data.avgs.yesterday.h, 1, '%') : '--'}</strong> avg yesterday</li>
                    </ul>
                  </div>
                </div>
              </article>

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
