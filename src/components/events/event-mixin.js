/**
 * Created by AshZhang on 15/9/1.
 */


'use strict';

import EventActions from '../actions/EventActions';


export default function (target) {
  let proto = target.prototype;

  proto.addEvent = function (startTime, eventName, eventType) {
    EventActions.addEvent({startTime, eventName, eventType});
  };

  proto.editEvent = function (id, eventName, eventType) {
    EventActions.editEvent({id, eventName, eventType});
  };

  proto.deleteEvent = function (id) {
    EventActions.deleteEvent(id);
  };

  proto.reopenEvent = function (id) {
    EventActions.reopenEvent(id);
  };

  proto.finishEvent = function (id) {
    EventActions.finishEvent(id);
  };

  proto.dropEvent = function (id, time) {
    EventActions.changeEventTime({id, time});
  };
}