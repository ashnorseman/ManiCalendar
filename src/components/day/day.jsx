/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import React from 'react';

import dateUtils from '../utils/dateUtils';

import DateStore from '../stores/DateStore';
import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';
import HalfHour from '../events/half-hour.jsx';


export default class Day extends React.Component {

  constructor(props) {
    super(props);

    this.renderLine = this.renderLine.bind(this);
  }

  render() {
    const date = this.props.DateStore.date;
    const events = this.props.EventStore.events;
    const renderLine = this.renderLine;

    return (
      <div className='mani-main'>
        <div className='mani-data-header'>
          <table>
            <thead>
              <tr>
                <th className='mani-th-time-label'></th>
                <th>{dateUtils.formatTime(date, 'M/dd')}</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className='mani-data-content'>
          <table>
            <tbody>
              {
                dateUtils.createArray(24).map(function (hour) {
                  return [
                    renderLine({date, hour, events}),
                    renderLine({date, hour, minutes: 30, events})
                  ]
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderLine({events, date, hour, minutes = 0}) {
    const time = date.setHours(hour, minutes);
    const eventsInRange = events.filter((event) => {
      return event.startHalfClock == time;
    });

    return (

      <tr className={minutes ? 'mani-clock-second-half' : 'mani-clock-first-half'}>
        {minutes ? null : <td rowSpan='2' className='mani-time-label'>{hour}:00</td>}
        <HalfHour time={time} events={eventsInRange}
                  onAddEvent={this.addEvent.bind(null, time)}
                  onEditEvent={this.editEvent}
                  onDeleteEvent={this.deleteEvent}
                  onReopenEvent={this.reopenEvent}
                  onDropEvent={this.dropEvent}
                  onFinishEvent={this.finishEvent} />
      </tr>
    );
  }

  addEvent(startTime, eventName, eventType) {
    EventActions.addEvent({startTime, eventName, eventType});
  }

  editEvent(id, eventName, eventType) {
    EventActions.editEvent({id, eventName, eventType});
  }

  deleteEvent(id) {
    EventActions.deleteEvent(id);
  }

  reopenEvent(id) {
    EventActions.reopenEvent(id);
  }

  finishEvent(id) {
    EventActions.finishEvent(id);
  }

  dropEvent(id, time) {
    EventActions.changeEventTime({id, time});
  }
};