/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import React from 'react';
import Component from '../utils/react-store-component';

import dateUtils from '../utils/dateUtils';

import HalfHour from '../events/half-hour.jsx';
import EventTypes from '../event-type/event-type.jsx';


export default class Day extends Component {

  constructor(props) {
    super(props);

    this.renderLine = this.renderLine.bind(this);
  }

  render() {
    const date = this.state.stores.date.data.date;
    const eventTypes = this.state.stores.eventTypes.data;
    const events = this.state.stores.events.data;
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
                dateUtils.createArray(24).map((hour) => {
                  return [
                    renderLine({date, hour, events, eventTypes}),
                    renderLine({date, hour, minutes: 30, events, eventTypes})
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

  renderLine({events, eventTypes, date, hour, minutes = 0}) {
    const time = date.setHours(hour, minutes);
    const eventsInRange = events.filter((event) => {
      return event.startHalfClock == time;
    });

    return (
      <tr className={minutes ? 'mani-clock-second-half' : 'mani-clock-first-half'}>
        {minutes ? null : <td rowSpan='2' className='mani-time-label'>{hour}:00</td>}
        <HalfHour key={time} time={time} eventStore={this.state.stores.events} events={eventsInRange} eventTypes={eventTypes} />
      </tr>
    );
  }
};