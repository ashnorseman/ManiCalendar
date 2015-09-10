/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import React from 'react';
import Component from '../../utils/react-store-component';

import dateUtils from '../../utils/dateUtils';

import HalfHour from '../events/half-hour.jsx';


export default class Day extends Component {

  constructor(props) {
    super(props);

    this.renderLine = this.renderLine.bind(this);
  }

  render() {
    const stores = this.props.stores;
    const date = stores.date.data.date;
    const eventTypes = stores.eventTypes.data;
    const events = stores.events.data;
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
      </div>
    );
  }

  renderLine({events, eventTypes, date, hour, minutes = 0}) {
    const eventStore = this.props.stores.events;
    const time = date.setHours(hour, minutes);
    const eventsInRange = events.filter((event) => {
      return event.startHalfClock == time;
    });

    return (
      <tr className={minutes ? 'mani-clock-second-half' : 'mani-clock-first-half'}>
        {minutes ? null : <td rowSpan='2' className='mani-time-label'>{hour}:00</td>}
        <HalfHour key={time} time={time} eventStore={eventStore} events={eventsInRange} eventTypes={eventTypes} />
      </tr>
    );
  }
};