/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import React from 'react';

import dateUtils from '../utils/dateUtils';
import DateStore from '../stores/DateStore';
import EventStore from '../stores/EventStore';
import EventMixin from '../events/event-mixin';
import HalfHour from '../events/half-hour.jsx';
import EventTypes from '../event-type/event-type.jsx';


const weekNames = '日一二三四五六';

@EventMixin
export default class Week extends React.Component {

  constructor(props) {
    super(props);

    this.renderLine = this.renderLine.bind(this);
  }

  render() {
    const rangeStart = this.props.DateStore.rangeStart;
    const events = this.props.EventStore.data;
    const eventTypes = this.props.EventTypeStore.data;
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
                      {renderLine({events, eventTypes, rangeStart, hour})}
                    </tr>,
                    <tr className='mani-clock-second-half' key={`clock-${hour}-30`}>
                      {renderLine({events, eventTypes, rangeStart, hour, minutes: 30})}
                    </tr>
                  ]
                })
              }
            </tbody>
          </table>
        </div>

        <EventTypes eventTypes={eventTypes} />
      </div>
    );
  }

  renderLine({events, eventTypes, rangeStart, hour, minutes = 0}) {

    return dateUtils.createArray(7).map((day) => {
      const time = new Date(dateUtils.addDate(rangeStart, day)).setHours(hour, minutes);
      const eventsInRange = events.filter((event) => {
        return event.startHalfClock == time;
      });

      return <HalfHour key={time}
                       time={time} events={eventsInRange} eventTypes={eventTypes}
                       onAddEvent={this.addEvent.bind(null, time)}
                       onEditEvent={this.editEvent}
                       onDeleteEvent={this.deleteEvent}
                       onReopenEvent={this.reopenEvent}
                       onDropEvent={this.dropEvent}
                       onFinishEvent={this.finishEvent} />;
    });
  }
}