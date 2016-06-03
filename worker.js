'use strict';
var fetch = require('isomorphic-fetch');
var _ = require('lodash');

if (!process.env.FIREBASE_AUTH_TOKEN) {
  throw new Error('FIREBASE_AUTH_TOKEN is not defined');
}

const firebaseSource = 'https://glacial-inferno.firebaseio.com';
const FIREBASE_AUTH_TOKEN = process.env.FIREBASE_AUTH_TOKEN;

fetch(`${firebaseSource}/climate-hdc.json`)
.then(response => {
  if (response.status >= 400) {
    throw new Error('Bad response');
  }
  return response.json();
})
.then(json => {
  let data = _.values(json);

  let startToday = new Date();
  startToday.setHours(0);
  startToday.setMinutes(0);
  startToday.setSeconds(0);

  startToday = Math.floor(startToday.getTime() / 1000);
  // Filter data older than 3 days.
  let daysAgo = startToday - (60 * 60 * 24 * 3);

  let historic = [];
  let current = [];

  _.forEach(data, o => {
    if (o.time >= daysAgo) {
      current.push(o);
    } else {
      historic.push(o);
    }
  });

  // Current is good to go.
  // Group historic by hour.
  historic = _(historic)
    .groupBy(o => {
      let date = new Date(o.time * 1000);
      date.setMinutes(0);
      date.setSeconds(0);

      return date;
    })
    .map((o, k) => {
      let date = new Date(k);
      return {
        time: Math.floor(date.getTime() / 1000),
        data: {
          h: Math.floor(_.meanBy(o, oo => oo.data.h) * 100) / 100,
          t: Math.floor(_.meanBy(o, oo => oo.data.t) * 100) / 100
        }
      };
    })
    .value();

  // Get existent historic
  fetch(`${firebaseSource}/climate-historic.json`)
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response');
    }
    return response.json();
  })
  .then(existent => {
    existent = existent || [];

    let newHistoric = existent.concat(historic);
    // Update historic.
    fetch(`${firebaseSource}/climate-historic.json?auth=${FIREBASE_AUTH_TOKEN}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHistoric)
    })
    .then(res => {
      // Update current.
      fetch(`${firebaseSource}/climate-hdc.json?auth=${FIREBASE_AUTH_TOKEN}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(current)
      })
      .then(res => {
        console.log('done');
      })
      .catch(e => {
        throw e;
      });
    })
    .catch(e => {
      throw e;
    });
  })
  .catch(e => {
    throw e;
  });
})
.catch(e => {
  throw e;
});
