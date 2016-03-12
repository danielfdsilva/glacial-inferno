'use strict';
import React from 'react';
import _ from 'lodash';
import { Link, IndexLink } from 'react-router';

var GlobalMenu = React.createClass({
  displayName: 'GlobalMenu',

  toggleHandler: function (e) {
    e.preventDefault();
    this.refs.nav.classList.toggle('show-menu');
  },

  resizeHandler: function () {
    if (window.getComputedStyle(this.refs.toggle.parentNode).display === 'none') {
      this.refs.nav.classList.toggle('show-menu');
    }
  },

  menuClickHandler: function () {
    this.refs.nav.classList.remove('show-menu');
  },

  componentDidMount: function () {
    this.refs.toggle.addEventListener('click', this.toggleHandler, false);

    this.resizeHandler = _.debounce(this.resizeHandler, 200);
    window.addEventListener('resize', this.resizeHandler);
  },

  componentWillUnmount: function () {
    this.refs.toggle.removeEventListener('click', this.toggleHandler);
    window.removeEventListener('resize', this.resizeHandler);
  },

  render: function () {
    return (
      <nav className='site-prime-nav' role='navigation' ref='nav'>
        <h2 className='toggle-menu'><a href='#global-menu' title='Show menu' ref='toggle'><span>Menu</span></a></h2>
        <div className='menu-wrapper'>
          <ul className='global-menu' id='global-menu'>
            <li><IndexLink to='/' className='global-menu-item' activeClassName='global-menu-item--active' onClick={this.menuClickHandler}><span>Overview</span></IndexLink></li>
            <li><Link to='/kenya' className='global-menu-item' activeClassName='global-menu-item--active' onClick={this.menuClickHandler}><span>Kenya</span></Link></li>
            <li><Link to='/malawi' className='global-menu-item' activeClassName='global-menu-item--active' onClick={this.menuClickHandler}><span>Malawi</span></Link></li>
            <li><Link to='/uganda' className='global-menu-item' activeClassName='global-menu-item--active' onClick={this.menuClickHandler}><span>Uganda</span></Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = GlobalMenu;
