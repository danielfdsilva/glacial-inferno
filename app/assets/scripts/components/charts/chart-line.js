'use strict';
import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
// import Popover from '../../utils/popover';

var LineChart = React.createClass({
  displayName: 'LineChart',

  propTypes: {
    className: React.PropTypes.string
  },

  chart: null,

  onWindowResize: function () {
    this.chart.update();
  },

  componentDidMount: function () {
    // console.log('LineChart componentDidMount');
    // Debounce event.
    this.onWindowResize = _.debounce(this.onWindowResize, 200);

    window.addEventListener('resize', this.onWindowResize);
    this.chart = new Chart(this.refs.container, this.props);
  },

  componentWillUnmount: function () {
    // console.log('LineChart componentWillUnmount');
    window.removeEventListener('resize', this.onWindowResize);
    this.chart.destroy();
  },

  componentDidUpdate: function (/* prevProps, prevState */) {
    // console.log('LineChart componentDidUpdate');
    this.chart.setData(this.props);
  },

  render: function () {
    return (
      <div className={this.props.className} ref='container'></div>
    );
  }
});

module.exports = LineChart;

var Chart = function (el, data) {
  this.$el = d3.select(el);

  this.data = null;

  // Var declaration.
  var margin = {top: 16, right: 32, bottom: 32, left: 24};
  // width and height refer to the data canvas. To know the svg size the margins
  // must be added.
  var _width, _height;
  // Draw functions.
  var line;
  // Scales, Axis.
  var x, y, xAxis;
  // Elements.
  var svg, dataCanvas;
  // Init the popover.
  // var chartPopover = new Popover();

  this._calcSize = function () {
    _width = parseInt(this.$el.style('width'), 10) - margin.left - margin.right;
    _height = parseInt(this.$el.style('height'), 10) - margin.top - margin.bottom;
  };

  this.setData = function (data) {
    var _data = _.cloneDeep(data);
    this.axisValue = _data.axisLineVal;
    this.axisValueMax = _data.axisLineMax;
    this.axisValueMin = _data.axisLineMin;
    this.dataUnitSuffix = _data.dataUnitSuffix;
    this.data = _data.data;
    this.update();
  };

  this._init = function () {
    this._calcSize();
    // The svg.
    svg = this.$el.append('svg')
        .attr('class', 'chart');

    // X scale. Range updated in function.
    x = d3.time.scale();

    // Y scale. Range updated in function.
    y = d3.scale.linear();

    // Line function for the delimit the area.
    line = d3.svg.line()
      .x(d => x(d.timestep))
      .y(d => y(d.value));

    // Define xAxis function.
    xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickSize(0)
      .tickFormat(d3.time.format('%H:%M'));

    // Chart elements
    dataCanvas = svg.append('g')
      .attr('class', 'data-canvas')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
      .attr('class', 'x axis')
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'start');

    let yAx = svg.append('g')
      .attr('class', 'y axis');

    yAx.append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'end');

    yAx.append('line')
      .attr('class', 'line');
  };

  this.update = function () {
    if (this.data === null) {
      return;
    }
    this._calcSize();

    // Update scale ranges
    let sDate = _.first(this.data).timestep;
    let eDate = _.last(this.data).timestep;
    x
      .domain([sDate, eDate])
      .range([0, _width]);

    // Since the data is stacked the last element will contain the
    // highest values)
    y
      .domain([this.axisValueMin, this.axisValueMax])
      .range([_height, 0]);

    xAxis.ticks(3);

    svg
      .attr('width', _width + margin.left + margin.right)
      .attr('height', _height + margin.top + margin.bottom);

    dataCanvas
      .attr('width', _width)
      .attr('height', _height);

    // ------------------------------
    // lines.
    let the_line = dataCanvas.selectAll('.data-line')
      .data([this.data]);

    // Handle new.
    the_line.enter()
      .append('path');

    // Update current.
    the_line
        .attr('d', d => line(d))
        .attr('class', d => `data-line`);

    // Remove old.
    the_line.exit()
      .remove();

    // ------------------------------
    // lines.
    let sorted = _.sortBy(this.data, 'value');
    let min = sorted[0];
    let max = _.last(sorted);

    let maxTxt = dataCanvas.select('.edge.edge-max');
    let minTxt = dataCanvas.select('.edge.edge-min');
    if (maxTxt.empty()) {
      let edgeG = dataCanvas.append('g');
      maxTxt = edgeG.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.25em')
        .attr('class', 'edge edge-max');

      minTxt = edgeG.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .attr('class', 'edge edge-min');
    }
    maxTxt
      .datum(max)
      .attr('x', d => x(d.timestep))
      .attr('y', d => y(d.value))
      .text(d => d.value + this.dataUnitSuffix);

    minTxt
      .datum(min)
      .attr('x', d => x(d.timestep))
      .attr('y', d => y(d.value))
      .text(d => d.value + this.dataUnitSuffix);

    // ------------------------------
    // Append Axis.
    svg.select('.x.axis')
      .attr('transform', `translate(${margin.left},${_height + margin.top + 16})`)
      .call(xAxis);

    svg.select('.y.axis .label')
      .attr('y', y(this.axisValue) + margin.top)
      .attr('x', _width + margin.left + margin.right)
      .attr('dy', '1em')
      .text(this.axisValue + this.dataUnitSuffix);

    svg.select('.y.axis .line')
      .attr('x1', 0)
      .attr('y1', y(this.axisValue) + margin.top)
      .attr('x2', _width + margin.left + margin.right)
      .attr('y2', y(this.axisValue) + margin.top);
  };

  this.destroy = function () {
    // chartPopover.hide();
  };

  // ------------------------------------------------------------------------ //
  // 3... 2... 1... GO...
  this._init();
  this.setData(data);
};
