/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import React from 'react';
import Component from '../../utils/react-store-component';

import dateUtils from '../../utils/dateUtils';

import HalfHour from '../events/half-hour.jsx';


const weekNames = '日一二三四五六';

export default class Week extends Component {

  constructor(props) {
    super(props);

    this.renderLine = this.renderLine.bind(this);
  }

  render() {
    const stores = this.props.stores;
    const rangeStart = stores.date.data.rangeStart;
    const eventTypes = stores.eventTypes.data;
    const events = stores.events.data;
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
      </div>
    );
  }

  renderLine({events, eventTypes, rangeStart, hour, minutes = 0}) {
    const eventStore = this.props.stores.events;

    return dateUtils.createArray(7).map((day) => {
      const time = new Date(dateUtils.addDate(rangeStart, day)).setHours(hour, minutes);
      const eventsInRange = events.filter((event) => {
        return event.startHalfClock == time;
      });

      return <HalfHour key={time} time={time} eventStore={eventStore} events={eventsInRange} eventTypes={eventTypes} />;
    });
  }
};