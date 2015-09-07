/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import React from 'react';

import dateUtils from '../utils/dateUtils';
import Event from '../events/event.jsx';
import EventTypes from '../event-type/event-type.jsx';


export default class Month extends React.Component {

  render() {
    const {rangeStart, rangeEnd, date} = this.props.DateStore;
    const events = this.props.EventStore.data;
    const eventTypes = this.props.EventTypeStore.data;
    const curMonth = date.getMonth();
    const weekCount = dateUtils.createArray(Math.ceil((rangeEnd - rangeStart) / 1000 / 60 / 60 / 24 / 7));
    const renderLine = this.renderLine;

    return (
      <div className='mani-main mani-month-view'>
        <div className='mani-data-header'>
          <table>
            <thead>
              <tr>
                <th>星期日</th>
                <th>星期一</th>
                <th>星期二</th>
                <th>星期三</th>
                <th>星期四</th>
                <th>星期五</th>
                <th>星期六</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className='mani-data-content'>
          <table>
            <tbody>
              {
                weekCount.map(function (week) {
                  return renderLine({events, week, rangeStart, curMonth});
                })
              }
            </tbody>
          </table>
        </div>

        <EventTypes eventTypes={eventTypes} />
      </div>
    );
  }

  renderLine({events, week, rangeStart, curMonth}) {

    return (
      <tr key={`week-${week}`}>{
        dateUtils.createArray(7).map((day) => {
          const time = dateUtils.addDate(rangeStart, week * 7 + day);
          const eventsInRange = events.filter((event) => {
            return event.startDate == time.valueOf();
          });

          return (
            <td data-time={time.valueOf()} key={time.valueOf()}
                className={(time.getMonth() !== curMonth) ? 'mani-td-mute' : ''}>
              <div className='mani-date-label'>{dateUtils.formatTime(time, 'M/dd')}</div>

              <div className='mani-month-events'>
                {
                  eventsInRange.map((event) => {
                    return <Event {...event} key={event.id} />;
                  })
                }
              </div>
            </td>
          );
        })
      }</tr>
    );
  }
};