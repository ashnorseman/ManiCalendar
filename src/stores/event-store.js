/**
 * Created by AshZhang on 15/8/29.
 */


'use strict';


import Store from '../utils/react-store';
import dateUtils from '../utils/dateUtils';
import CONF from '../config';


class EventStore extends Store {

  addEvent({startTime, eventName, eventType}) {
    let event = {startTime, eventName, eventType};

    event.status = '进行中';
    event.createTime = Date.now();

    // shortcuts to view
    event.startHalfClock = startTime - startTime % (1000 * 60 * 30);
    event.startDate = dateUtils.trimHours(startTime);

    this.create(event);
  }

  editEvent({id, eventName, eventType}) {
    let event = this.data.filter(function (event) {
      return event.id === id;
    })[0];

    eventName && (event.eventName = eventName);
    eventType && (event.eventType = eventType);

    this.update(event);
  }

  deleteEvent(id) {
    this.delete(id);
  }

  reopenEvent(event) {
    event.status = '进行中';
    this.update(event);
  }

  finishEvent(event) {
    event.status = '已完成';
    this.update(event);
  }

  changeEventTime({event, time}) {
    event.startTime = time;
    event.startHalfClock = time;
    delete event.endTime;

    this.update(event);
  }
}


export default new EventStore({
  rootUrl: CONF.API_ROOT + 'events',
  init: function () {
    this.read();
  }
});