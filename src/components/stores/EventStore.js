/**
 * Created by AshZhang on 15/8/29.
 */


'use strict';


import alt from '../../libs/alt';

import dateUtils from '../utils/dateUtils';
import ajax from '../utils/ajax';
import EventActions from '../actions/EventActions';

const ROOT = 'http://localhost:9090/';


class EventStore {

  constructor() {
    this.bindActions(EventActions);

    this.events = [];

    ajax.get(ROOT + 'events')
      .then((res) => {

        this.setState({
          events: res
        });
      });
  }

  addEvent({startTime, eventName, eventType}) {
    let event = {startTime, eventName, eventType};

    event.status = '进行中';
    event.createTime = Date.now();

    // shortcuts to view
    event.startHalfClock = startTime - startTime % (1000 * 60 * 30);
    event.startDate = dateUtils.trimHours(startTime);

    ajax.post(ROOT + 'events', event)
      .then((res) => {

        this.setState({
          events: this.events.concat(event)
        });
      });
  }

  editEvent({id, eventName, eventType}) {
    let event = this.events.filter(function (event) {
      return event.id === id;
    })[0];

    eventName && (event.eventName = eventName);
    eventType && (event.eventType = eventType);

    ajax.put(ROOT + 'events/' + event.id, event)
      .then((res) => {
        this.setState(this.events);
      });
  }

  deleteEvent(id) {
    const event = this.events.filter(function (event) {
      return event.id === id;
    })[0];

    const index = this.events.indexOf(event);

    ajax.delete(ROOT + 'events/' + event.id, event)
      .then((res) => {

        this.setState({
          events: this.events.slice(0, index).concat(this.events.slice(index + 1))
        });
      });
  }

  reopenEvent(id) {
    const event = this.events.filter(function (event) {
      return event.id === id;
    })[0];

    event.status = '进行中';

    ajax.put(ROOT + 'events/' + event.id, event)
      .then((res) => {
        this.setState(this.events);
      });
  }

  finishEvent(id) {
    const event = this.events.filter(function (event) {
      return event.id === id;
    })[0];

    event.status = '已完成';

    ajax.put(ROOT + 'events/' + event.id, event)
      .then((res) => {
        this.setState(this.events);
      });
  }
}


export default alt.createStore(EventStore, 'EventStore');