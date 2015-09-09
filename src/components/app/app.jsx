/**
 * Created by AshZhang on 15/8/27.
 */


'use strict';

import './app.less';

import React from 'react';
import Router, { Route, Redirect, RouteHandler } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import dateUtils from '../utils/dateUtils';

import Header from '../header/header.jsx';
import Day from '../day/day.jsx';
import Week from '../week/week.jsx';
import Month from '../month/month.jsx';

import dateStore from '../header/date-store';
import eventTypeStore from '../event-type/event-type-store';
import eventStore from '../events/event-store';


/**
 * App Root
 */
@DragDropContext(HTML5Backend)
class App extends React.Component {

  constructor(props) {
    super(props);

    dateStore.refactor();
  }

  render() {

    return (
      <div className='mani'>
        <Header stores={{date: dateStore}} />
        <RouteHandler stores={{date: dateStore, events: eventStore, eventTypes: eventTypeStore}} />
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