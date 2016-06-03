!function e(t,a,s){function n(r,l){if(!a[r]){if(!t[r]){var o="function"==typeof require&&require;if(!l&&o)return o(r,!0);if(i)return i(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=a[r]={exports:{}};t[r][0].call(u.exports,function(e){var a=t[r][1][e];return n(a?a:e)},u,u.exports,e,t,a,s)}return a[r].exports}for(var i="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n}({"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/actions/action-creators.js":[function(e,t,a){"use strict";function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t["default"]=e,t}function n(e){return e&&e.__esModule?e:{"default":e}}function i(){return{type:h.REQUEST_SENSOR_DATA}}function r(e){return{type:h.RECEIVE_SENSOR_DATA,data:e,receivedAt:Date.now()}}function l(){return function(e){return e(i()),(0,f["default"])(v["default"].firebaseSource+"/climate-hdc.json").then(function(e){if(e.status>=400)throw new Error("Bad response");return e.json()}).then(function(t){e(r(t))})["catch"](function(e){throw e})}}function o(){return{type:h.REQUEST_HIST_SENSOR_DATA}}function c(e){return{type:h.RECEIVE_HIST_SENSOR_DATA,data:e,receivedAt:Date.now()}}function u(){return function(e){return e(o()),(0,f["default"])(v["default"].firebaseSource+"/climate-historic.json").then(function(e){if(e.status>=400)throw new Error("Bad response");return e.json()}).then(function(t){e(c(t))})["catch"](function(e){throw e})}}Object.defineProperty(a,"__esModule",{value:!0}),a.fetchSensorData=l,a.fetchHistSensorData=u;var d=e("isomorphic-fetch"),f=n(d),p=e("./action-types"),h=s(p),m=e("../config"),v=n(m)},{"../config":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config.js","./action-types":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/actions/action-types.js","isomorphic-fetch":"isomorphic-fetch"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/actions/action-types.js":[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});a.REQUEST_SENSOR_DATA="REQUEST_SENSOR_DATA",a.RECEIVE_SENSOR_DATA="RECEIVE_SENSOR_DATA",a.REQUEST_HIST_SENSOR_DATA="REQUEST_HIST_SENSOR_DATA",a.RECEIVE_HIST_SENSOR_DATA="RECEIVE_HIST_SENSOR_DATA"},{}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/components/charts/chart-line.js":[function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}var n=function(){function e(e,t){var a=[],s=!0,n=!1,i=void 0;try{for(var r,l=e[Symbol.iterator]();!(s=(r=l.next()).done)&&(a.push(r.value),!t||a.length!==t);s=!0);}catch(o){n=!0,i=o}finally{try{!s&&l["return"]&&l["return"]()}finally{if(n)throw i}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=e("react"),r=s(i),l=e("d3"),o=s(l),c=e("lodash"),u=s(c),d=r["default"].createClass({displayName:"LineChart",propTypes:{className:r["default"].PropTypes.string,data:r["default"].PropTypes.array,axisLineVal:r["default"].PropTypes.number,axisLineMax:r["default"].PropTypes.number,axisLineMin:r["default"].PropTypes.number,numDaysVisible:r["default"].PropTypes.number,dataUnitSuffix:r["default"].PropTypes.string},chart:null,onWindowResize:function(){this.chart.checkSize()},componentDidMount:function(){this.onWindowResize=u["default"].debounce(this.onWindowResize,200),window.addEventListener("resize",this.onWindowResize),this.chart=f(),o["default"].select(this.refs.container).call(this.chart.data(this.props.data).axisLineVal(this.props.axisLineVal).axisValueMax(this.props.axisLineMax).axisValueMin(this.props.axisLineMin).numDaysVisible(this.props.numDaysVisible).dataUnitSuffix(this.props.dataUnitSuffix))},componentWillUnmount:function(){window.removeEventListener("resize",this.onWindowResize),this.chart.destroy()},componentDidUpdate:function(e){console.log("LineChart componentDidUpdate"),this.chart.pauseUpdate(),e.data!==this.props.data&&this.chart.data(this.props.data),e.axisLineVal!==this.props.axisLineVal&&this.chart.axisLineVal(this.props.axisLineVal),e.axisLineMax!==this.props.axisLineMax&&this.chart.axisValueMax(this.props.axisLineMax),e.axisLineMin!==this.props.axisLineMin&&this.chart.axisValueMin(this.props.axisLineMin),e.dataUnitSuffix!==this.props.dataUnitSuffix&&this.chart.dataUnitSuffix(this.props.dataUnitSuffix),this.chart.continueUpdate()},render:function(){return r["default"].createElement("div",{className:this.props.className,ref:"container"})}});t.exports=d;var f=function(e){function t(){p=parseInt(d.style("width"),10)-E.left-E.right,h=parseInt(d.style("height"),10)-E.top-E.bottom}function a(e){d=e;var a={line:function(){var e=M.selectAll(".data-line").data([x]);e.enter().append("path").attr("clip-path","url(#clip)"),e.attr("d",function(e){return m(e)}).attr("class",function(e){return"data-line"}),e.exit().remove()},minMax:function(){var e=D.domain(),t=n(e,2),a=t[0],s=t[1],i=function(e){var t=e.timestep.getTime();return t>=a.getTime()&&t<=s.getTime()},r=(0,u["default"])(x).filter(i).sortBy("value").value();if(r.length){var l=r[0],o=u["default"].last(r),d=M.selectAll(".edges").data([0]).enter().append("g").attr("class","edges");d.append("text").attr("text-anchor","middle").attr("dy","-0.25em").attr("class","edge edge-max"),d.append("text").attr("text-anchor","middle").attr("dy","1em").attr("class","edge edge-min"),M.select(".edge.edge-max").datum(o).attr("x",function(e){return D(e.timestep)}).attr("y",function(e){return S(e.value)}).text(function(e){return e.value+c}),M.select(".edge.edge-min").datum(l).attr("x",function(e){return D(e.timestep)}).attr("y",function(e){return S(e.value)}).text(function(e){return e.value+c})}},xAxis:function(){var e=f.selectAll(".x.axis").data([0]);e.enter().append("g").attr("class","x axis").append("text").attr("class","label").attr("text-anchor","start"),e.attr("transform","translate("+E.left+","+(h+E.top+16)+")").call(N)},yAxis:function(){var e=f.selectAll(".y.axis").data([0]),t=e.enter().append("g").attr("class","y axis");t.append("text").attr("class","label").attr("text-anchor","end"),t.append("line").attr("class","line"),e.select(".label").attr("y",S(s)+E.top).attr("x",p+E.left+E.right).attr("dy","1em").text(s+c),e.select(".line").attr("x1",0).attr("y1",S(s)+E.top).attr("x2",p+E.left+E.right).attr("y2",S(s)+E.top)},days:function(){for(var e=function(e){var t=new Date(e.getTime());return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t},t=e(u["default"].last(x).timestep),a=e(x[0].timestep),s=[a];;)if(a=o["default"].time.day.offset(e(a),1),s.push(a),a.getTime()>=t.getTime())break;var n=M.selectAll(".days").data([0]);n.enter().append("g").attr("class","days");var i=n.selectAll(".day-tick").data(s);i.enter().append("text").attr("text-anchor","middle").attr("class","day-tick"),i.attr("x",function(e){return D(e)}).attr("y",h+E.top).text(function(e){return e.getDate()+" "+b[e.getMonth()]})}};g=function(){f.attr("width",p+E.left+E.right).attr("height",h+E.top+E.bottom),M.attr("width",p).attr("height",h),f.select("#clip rect").attr("x",-E.left).attr("y",-E.top).attr("width",p+E.left).attr("height",h+E.top+E.bottom),D.range([0,p]),S.range([h,0]),y=D(x[0].timestep),T.x(D),400>p?N.ticks(3):N.ticks(10),a.line(),a.minMax(),a.days(),a.xAxis(),a.yAxis()},v=function(){if(x&&!_){var e=u["default"].last(x).timestep,t=o["default"].time.day.offset(e,-(l||1));D.domain([t,e]),S.domain([i,r]),y=D(x[0].timestep),T.x(D),a.line(),a.minMax(),a.days(),a.xAxis(),a.yAxis()}},f=d.append("svg").attr("class","chart").style("display","block");var M=f.append("g").attr("class","data-canvas").attr("transform","translate("+E.left+","+E.top+")");f.append("defs").append("clipPath").attr("id","clip").append("rect"),f.attr("cursor","move").call(T).on("mousewheel.zoom",null).on("DOMMouseScroll.zoom",null),T.on("zoom",function(){var e=T.translate(),t=n(e,2),s=t[0],i=t[1];s=Math.max(s,0),s=Math.min(s,Math.abs(y)-E.right),s=Math.round(s),T.translate([s,i]),a.line(),a.minMax(),a.days(),a.xAxis()}),t(),g(),v()}var s,i,r,l,c,d,f,p,h,m,v,g,y,x=null,_=!1,E={top:16,right:32,bottom:32,left:24},b=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],D=o["default"].time.scale(),S=o["default"].scale.linear(),T=o["default"].behavior.zoom().scaleExtent([1,1]);m=o["default"].svg.line().x(function(e){return D(e.timestep)}).y(function(e){return S(e.value)});var N=o["default"].svg.axis().scale(D).orient("bottom").tickSize(0).tickFormat(o["default"].time.format("%H:%M"));return a.checkSize=function(){return t(),g(),a},a.destroy=function(){},a.data=function(e){return arguments.length?(x=u["default"].cloneDeep(e),"function"==typeof v&&v(),a):x},a.axisLineVal=function(e){return arguments.length?(s=e,"function"==typeof v&&v(),a):s},a.axisValueMin=function(e){return arguments.length?(i=e,"function"==typeof v&&v(),a):i},a.axisValueMax=function(e){return arguments.length?(r=e,"function"==typeof v&&v(),a):r},a.numDaysVisible=function(e){return arguments.length?(l=e,"function"==typeof v&&v(),a):l},a.dataUnitSuffix=function(e){return arguments.length?(c=e,"function"==typeof v&&v(),a):c},a.pauseUpdate=function(){return _=!0,a},a.continueUpdate=function(){return _=!1,"function"==typeof v&&v(),a},a}},{d3:"d3",lodash:"lodash",react:"react"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/components/sensor-widget.js":[function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}var n=e("react"),i=s(n),r=e("./charts/chart-line"),l=s(r),o=e("../utils/format"),c=i["default"].createClass({displayName:"SensorWidget",propTypes:{fetching:i["default"].PropTypes.bool,fetched:i["default"].PropTypes.bool,className:i["default"].PropTypes.string,title:i["default"].PropTypes.string,lastReading:i["default"].PropTypes.object,avgs:i["default"].PropTypes.object,plotData:i["default"].PropTypes.array,axisLineVal:i["default"].PropTypes.number,axisLineMax:i["default"].PropTypes.number,axisLineMin:i["default"].PropTypes.number,numDaysVisible:i["default"].PropTypes.number,unit:i["default"].PropTypes.string},render:function(){var e=this.props,t=e.className,a=e.fetching,s=e.fetched,n=e.title,r=e.lastReading,c=e.avgs,u=e.plotData,d=e.axisLineVal,f=e.axisLineMax,p=e.axisLineMin,h=e.numDaysVisible,m=e.unit;return s||a?i["default"].createElement("article",{className:"card "+t},i["default"].createElement("header",{className:"card__header"},i["default"].createElement("div",{className:"card__headline"},i["default"].createElement("h1",{className:"card__title"},n," ",a?"...":null),i["default"].createElement("dl",{className:"stats"},i["default"].createElement("dd",{className:"stats__label"},"Last update"),i["default"].createElement("dt",{className:"stats__date"},null!==r?(0,o.formatDate)(r.timestep):"--"),i["default"].createElement("dd",{className:"stats__label"},"Current temperature"),i["default"].createElement("dt",{className:"stats__value"},null!==r?(0,o.numDisplay)(r.value,1):"--",m)))),i["default"].createElement("div",{className:"card__body"},i["default"].createElement("div",{className:"infographic"},u.length?i["default"].createElement("div",{className:"line-chart-wrapper"},i["default"].createElement(l["default"],{className:"line-chart",axisLineVal:d,axisLineMax:f,axisLineMin:p,dataUnitSuffix:m,numDaysVisible:h,data:u})):null,!u.length&&a?i["default"].createElement("p",{className:"card__loading"},"Loading Data..."):null),i["default"].createElement("div",{className:"metrics"},i["default"].createElement("ul",{className:"metrics__list"},i["default"].createElement("li",null,i["default"].createElement("strong",null,null!==c?(0,o.numDisplay)(c.today,1,m):"--")," avg today"),i["default"].createElement("li",null,i["default"].createElement("strong",null,null!==c?(0,o.numDisplay)(c.yesterday,1,m):"--")," avg yesterday"))))):null}});t.exports=c},{"../utils/format":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/utils/format.js","./charts/chart-line":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/components/charts/chart-line.js",react:"react"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config.js":[function(e,t,a){"use strict";var s=e("lodash"),n={local:e("./config/local.js"),production:e("./config/production.js"),staging:e("./config/staging.js")},i=n.local||{};s.defaultsDeep(i,n.production),t.exports=i},{"./config/local.js":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config/local.js","./config/production.js":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config/production.js","./config/staging.js":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config/staging.js",lodash:"lodash"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config/local.js":[function(e,t,a){"use strict";t.exports={}},{}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config/production.js":[function(e,t,a){"use strict";t.exports={environment:"production",firebaseSource:"https://glacial-inferno.firebaseio.com"}},{}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/config/staging.js":[function(e,t,a){"use strict";t.exports={environment:"staging"}},{}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/main.js":[function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}e("babel-polyfill");var n=e("react"),i=s(n),r=e("react-dom"),l=e("react-redux"),o=e("react-router"),c=e("history"),u=e("redux"),d=e("redux-thunk"),f=s(d),p=e("react-router-redux"),h=e("./reducers/reducer"),m=s(h),v=e("./views/app"),g=s(v),y=e("./views/home"),x=s(y),_=e("./views/historic"),E=s(_),b=(0,o.useRouterHistory)(c.createHashHistory)({queryKey:!1}),D=(0,p.syncHistory)(b),S=(0,u.compose)((0,u.applyMiddleware)(D,f["default"]))(u.createStore),T=S(m["default"]);(0,r.render)(i["default"].createElement(l.Provider,{store:T},i["default"].createElement(o.Router,{history:b},i["default"].createElement(o.Route,{path:"/",component:g["default"]},i["default"].createElement(o.Route,{path:"/historic",component:E["default"]}),i["default"].createElement(o.IndexRoute,{component:x["default"]})))),document.querySelector("#site-canvas"))},{"./reducers/reducer":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/reducers/reducer.js","./views/app":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/views/app.js","./views/historic":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/views/historic.js","./views/home":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/views/home.js","babel-polyfill":"babel-polyfill",history:"history",react:"react","react-dom":"react-dom","react-redux":"react-redux","react-router":"react-router","react-router-redux":"react-router-redux",redux:"redux","redux-thunk":"redux-thunk"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/reducers/reducer.js":[function(e,t,a){"use strict";function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t["default"]=e,t}function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(a,"__esModule",{value:!0});var i=e("lodash"),r=n(i),l=e("redux"),o=e("react-router-redux"),c=e("../actions/action-types"),u=s(c),d=function(){var e=arguments.length<=0||void 0===arguments[0]?{fetching:!1,fetched:!1,data:null}:arguments[0],t=arguments[1];switch(t.type){case u.REQUEST_SENSOR_DATA:console.log("REQUEST_SENSOR_DATA"),e=r["default"].cloneDeep(e),e.fetching=!0;break;case u.RECEIVE_SENSOR_DATA:console.log("RECEIVE_SENSOR_DATA"),e=r["default"].cloneDeep(e),e.data=t.data,e.fetching=!1,e.fetched=!0}return e},f=function(){var e=arguments.length<=0||void 0===arguments[0]?{fetching:!1,fetched:!1,data:null}:arguments[0],t=arguments[1];switch(t.type){case u.REQUEST_HIST_SENSOR_DATA:console.log("REQUEST_HIST_SENSOR_DATA"),e=r["default"].cloneDeep(e),e.fetching=!0;break;case u.RECEIVE_HIST_SENSOR_DATA:console.log("RECEIVE_HIST_SENSOR_DATA"),e=r["default"].cloneDeep(e),e.data=t.data,e.fetching=!1,e.fetched=!0}return e};a["default"]=(0,l.combineReducers)({routing:o.routeReducer,sensorData:d,histSensorData:f})},{"../actions/action-types":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/actions/action-types.js",lodash:"lodash","react-router-redux":"react-router-redux",redux:"redux"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/utils/format.js":[function(e,t,a){"use strict";t.exports.numDisplay=function(e){var t=arguments.length<=1||void 0===arguments[1]?2:arguments[1],a=arguments.length<=2||void 0===arguments[2]?"":arguments[2],s=arguments.length<=3||void 0===arguments[3]?"--":arguments[3];if(isNaN(e))return s;var n=e.toString();return n=-1===n.indexOf(".")?n:n.substr(0,n.indexOf(".")+t+1),n+a},t.exports.formatDate=function(e){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=e.getHours();a=10>a?"0"+a:a;var s=e.getMinutes();return s=10>s?"0"+s:s,t[e.getMonth()]+" "+e.getDate()+", "+a+":"+s},t.exports.round=function(e){var a=arguments.length<=1||void 0===arguments[1]?2:arguments[1];return+t.exports.numDisplay(e,a)}},{}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/views/app.js":[function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}var n=e("react"),i=s(n),r=i["default"].createClass({displayName:"App",propTypes:{dispatch:i["default"].PropTypes.func,children:i["default"].PropTypes.object},render:function(){return i["default"].createElement("div",null,i["default"].createElement("header",{className:"site-header",role:"banner"},i["default"].createElement("div",{className:"inner"},i["default"].createElement("div",{className:"site-headline"},i["default"].createElement("h1",{className:"site-title"},"Glacial Inferno")))),i["default"].createElement("main",{className:"site-body",role:"main"},this.props.children))}});t.exports=r},{react:"react"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/views/historic.js":[function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function n(e){return{histSensorData:e.histSensorData}}function i(e){return{_requestHistSensorData:function(){return e((0,d.fetchHistSensorData)())}}}var r=e("react"),l=s(r),o=e("react-redux"),c=e("lodash"),u=s(c),d=e("../actions/action-creators"),f=e("../components/sensor-widget"),p=s(f),h=l["default"].createClass({displayName:"Historic",propTypes:{_requestHistSensorData:l["default"].PropTypes.func,histSensorData:l["default"].PropTypes.shape({fetched:l["default"].PropTypes.bool,fetching:l["default"].PropTypes.bool,data:l["default"].PropTypes.array})},_fetchInterval:null,_fetchRate:600,prepareData:function(){var e=u["default"].values(this.props.histSensorData.data),t=new Date;t.setHours(0),t.setMinutes(0),t.setSeconds(0),t=Math.floor(t.getTime()/1e3);var a=t-86400,s=[],n=[],i=[],r=[],l=[],o=[];return u["default"].forEach(e,function(e){var c={timestep:new Date(1e3*e.time),value:e.data.t},u={timestep:new Date(1e3*e.time),value:e.data.h};s.push(c),r.push(u),e.time>=t&&(n.push(c),l.push(u)),e.time<t&&e.time>=a&&(i.push(c),o.push(u))}),{temp:{data:s,last:u["default"].last(s)||null,avgs:{today:u["default"].meanBy(n,"value"),yesterday:u["default"].meanBy(i,"value")}},hum:{data:r,last:u["default"].last(r)||null,avgs:{today:u["default"].meanBy(l,"value"),yesterday:u["default"].meanBy(o,"value")}}}},fetchData:function(){this.props._requestHistSensorData()},componentDidMount:function(){var e=this;this.fetchData(),this._fetchInterval=setInterval(function(){e.fetchData()},1e3*this._fetchRate)},componentWillUnmount:function(){this._fetchInterval&&clearInterval(this._fetchInterval)},render:function(){var e=this.props.histSensorData,t=e.fetched,a=e.fetching,s=this.prepareData(),n=s.temp,i=s.hum;return l["default"].createElement("section",{className:"page"},l["default"].createElement("header",{className:"page__header"},l["default"].createElement("div",{className:"inner"},l["default"].createElement("div",{className:"page__headline"},l["default"].createElement("h1",{className:"page__title"},"Historic Page")))),l["default"].createElement("div",{className:"page__body"},l["default"].createElement("section",{className:"page__content"},l["default"].createElement("div",{className:"inner"},l["default"].createElement(p["default"],{className:"card--temp",fetching:a,fetched:t,title:"Historic Temperature",lastReading:n.last,avgs:n.avgs,plotData:n.data,axisLineMax:35,axisLineVal:20,axisLineMin:10,numDaysVisible:7,unit:" ºC"}),l["default"].createElement(p["default"],{className:"card--hum",fetching:a,fetched:t,title:"Historic Humidity",lastReading:i.last,avgs:i.avgs,plotData:i.data,axisLineMax:100,axisLineVal:50,axisLineMin:25,numDaysVisible:7,unit:" %"})))))}});t.exports=(0,o.connect)(n,i)(h)},{"../actions/action-creators":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/actions/action-creators.js","../components/sensor-widget":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/components/sensor-widget.js",lodash:"lodash",react:"react","react-redux":"react-redux"}],"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/views/home.js":[function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function n(e){return{sensorData:e.sensorData}}function i(e){return{_requestSensorData:function(){return e((0,d.fetchSensorData)())}}}var r=e("react"),l=s(r),o=e("react-redux"),c=e("lodash"),u=s(c),d=e("../actions/action-creators"),f=e("../components/sensor-widget"),p=s(f),h=l["default"].createClass({displayName:"Home",propTypes:{_requestSensorData:l["default"].PropTypes.func,sensorData:l["default"].PropTypes.shape({fetched:l["default"].PropTypes.bool,fetching:l["default"].PropTypes.bool,data:l["default"].PropTypes.object})},_fetchInterval:null,_fetchRate:600,prepareData:function(){var e=u["default"].values(this.props.sensorData.data),t=new Date;t.setHours(0),t.setMinutes(0),t.setSeconds(0),t=Math.floor(t.getTime()/1e3);var a=t-86400,s=t-259200,n=[],i=[],r=[],l=[],o=[],c=[];return u["default"].forEach(e,function(e){var u={timestep:new Date(1e3*e.time),value:e.data.t},d={timestep:new Date(1e3*e.time),value:e.data.h};e.time>=s&&(n.push(u),l.push(d)),e.time>=t&&(i.push(u),o.push(d)),e.time<t&&e.time>=a&&(r.push(u),c.push(d))}),{temp:{data:n,last:u["default"].last(n)||null,avgs:{today:u["default"].meanBy(i,"value"),yesterday:u["default"].meanBy(r,"value")}},hum:{data:l,last:u["default"].last(l)||null,avgs:{today:u["default"].meanBy(o,"value"),yesterday:u["default"].meanBy(c,"value")}}}},fetchData:function(){this.props._requestSensorData()},componentDidMount:function(){var e=this;this.fetchData(),this._fetchInterval=setInterval(function(){e.fetchData()},1e3*this._fetchRate)},componentWillUnmount:function(){this._fetchInterval&&clearInterval(this._fetchInterval)},render:function(){var e=this.props.sensorData,t=e.fetched,a=e.fetching,s=this.prepareData(),n=s.temp,i=s.hum;return l["default"].createElement("section",{className:"page"},l["default"].createElement("header",{className:"page__header"},l["default"].createElement("div",{className:"inner"},l["default"].createElement("div",{className:"page__headline"},l["default"].createElement("h1",{className:"page__title"},"Home Page")))),l["default"].createElement("div",{className:"page__body"},l["default"].createElement("section",{className:"page__content"},l["default"].createElement("div",{className:"inner"},l["default"].createElement(p["default"],{className:"card--temp",fetching:a,fetched:t,title:"Temperature",lastReading:n.last,avgs:n.avgs,plotData:n.data,axisLineMax:35,axisLineVal:20,axisLineMin:10,numDaysVisible:1,unit:" ºC"}),l["default"].createElement(p["default"],{className:"card--hum",fetching:a,fetched:t,title:"Humidity",lastReading:i.last,avgs:i.avgs,plotData:i.data,axisLineMax:100,axisLineVal:50,axisLineMin:25,numDaysVisible:1,unit:" %"})))))}});t.exports=(0,o.connect)(n,i)(h)},{"../actions/action-creators":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/actions/action-creators.js","../components/sensor-widget":"/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/components/sensor-widget.js",lodash:"lodash",react:"react","react-redux":"react-redux"}]},{},["/home/travis/build/danielfdsilva/glacial-inferno/app/assets/scripts/main.js"]);