/**
 * Created by AshZhang on 15/8/27.
 */


'use strict';

import './app.less';

import React from 'react';
import Router, { Route, DefaultRoute, NotFoundRoute, RouteHandler } from 'react-router';
import AltContainer from 'alt/AltContainer';

import DateStore from '../stores/DateStore';
import EventStore from '../stores/EventStore';

import Header from '../header/header.jsx';
import Day from '../day/day.jsx';
import Week from '../week/week.jsx';
import Month from '../month/month.jsx';


/**
 * App Root
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    DateStore.init();
  }

  render() {

    return (
      <div className='mani'>
        <AltContainer stores={{DateStore, EventStore}}>
          <Header />
          <RouteHandler />
        </AltContainer>
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
    <NotFoundRoute handler={Day} />
  </Route>
);


Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('app'));
});