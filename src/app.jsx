/**
 * Created by AshZhang on 15/8/27.
 */


'use strict';

import '../node_modules/normalize.css/normalize.css';
import './app.less';

import React from 'react';
import Router, { Route, Redirect, RouteHandler } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import dateUtils from './utils/dateUtils';

import Header from './components/header/header.jsx';
import Day from './components/day/day.jsx';
import Week from './components/week/week.jsx';
import Month from './components/month/month.jsx';
import EventType from './components/event-type/event-type.jsx';

import dateStore from './stores/date-store';
import eventTypeStore from './stores/event-type-store';
import eventStore from './stores/event-store';


/**
 * App Root
 */
@DragDropContext(HTML5Backend)
class App extends React.Component {

  render() {

    return (
      <div className='mani'>
        <Header stores={{date: dateStore}} />
        <RouteHandler stores={{date: dateStore, events: eventStore, eventTypes: eventTypeStore}} />
        <EventType stores={{eventTypes: eventTypeStore}} />
      </div>
    );
  }
}


/**
 * Routes
 */
const routes = (
  <Route handler={App}>
    <Route name='day' path='day/:date?' handler={Day}></Route>
    <Route name='week' path='week/:date?' handler={Week}></Route>
    <Route name='month' path='month/:date?' handler={Month}></Route>
    <Redirect from='/' to='week' params={{date: dateUtils.formatTime(new Date())}} />
  </Route>
);


Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('app'));
});