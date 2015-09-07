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

  proto.deleteEvent = function (event) {
    EventActions.deleteEvent(event);
  };

  proto.reopenEvent = function (event) {
    EventActions.reopenEvent(event);
  };

  proto.finishEvent = function (event) {
    EventActions.finishEvent(event);
  };

  proto.dropEvent = function (event, time) {
    EventActions.changeEventTime({event, time});
  };
}