/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import React from 'react';

import dateUtils from '../utils/dateUtils';
import DateStore from '../stores/DateStore';
import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';
import HalfHour from '../events/half-hour.jsx'


const weekNames = '日一二三四五六';


export default class Week extends React.Component {

  constructor(props) {
    super(props);

    this.renderLine = this.renderLine.bind(this);
  }

  render() {
    const rangeStart = this.props.DateStore.rangeStart;
    const events = this.props.EventStore.events;
    const renderLine = this.renderLine;

    return (
      <div className='mani-main mani-week-view'>
        <div className='mani-data-header'>
          <table>
            <thead>
              <tr>
                <th className='mani-th-time-label'></th>
                {
                  dateUtils.createArray(7).map(function (day) {
                    const date = dateUtils.addDate(rangeStart, day);

                    return (
                      <th key={`week-${day}`}>
                        {dateUtils.formatTime(date, 'M/dd')} <span className='text-base'>星期{weekNames[date.getDay()]}</span>
                      </th>
                    );
                  })
                }
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
                    <tr className='mani-clock-first-half' key={`clock-${hour}`}>
                      <td rowSpan='2' className='mani-time-label'>{hour}:00</td>
                      {renderLine({events, rangeStart, hour})}
                    </tr>,
                    <tr className='mani-clock-second-half' key={`clock-${hour}-30`}>
                      {renderLine({events, rangeStart, hour, minutes: 30})}
                    </tr>
                  ]
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderLine({events, rangeStart, hour, minutes = 0}) {

    return dateUtils.createArray(7).map((day) => {
      const time = new Date(dateUtils.addDate(rangeStart, day)).setHours(hour, minutes);
      const eventsInRange = events.filter((event) => {
        return event.startHalfClock == time;
      });

      return <HalfHour key={time}
                       time={time} events={eventsInRange}
                       onAddEvent={this.addEvent.bind(null, time)}
                       onEditEvent={this.editEvent}
                       onDeleteEvent={this.deleteEvent}
                       onReopenEvent={this.reopenEvent}
                       onFinishEvent={this.finishEvent} />;

      //return <td data-time={time} key={`time-${time}`}></td>;
    });
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
};