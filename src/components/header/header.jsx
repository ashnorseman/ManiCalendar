/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';

import './header.less';

import React from 'react';
import { Link } from 'react-router';

import dateUtils from '../utils/dateUtils';

import DateActions from '../actions/DateActions';
import DateStore from '../stores/DateStore';


export default class Header extends React.Component {

  constructor(prop) {
    super(prop);

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  render() {
    const DateStore = this.props.DateStore;
    const prevTarget = this.prev(DateStore);
    const nextTarget = this.next(DateStore);
    const todayText = dateUtils.formatTime(Date.now());

    return (
      <header className='mani-header'>
        <div className='mani-header-date-switch'>
          <Link to={DateStore.range} params={{date: prevTarget}} className='mani-header-date-btn mani-header-date-prev'>向前 <span className='arrow'></span></Link>
          <span className='mani-header-date-range'>{
            DateStore.range === 'day'
              ? DateStore.rangeStartText
              : `${DateStore.rangeStartText} – ${DateStore.rangeEndText}`
          }</span>
          <Link to={DateStore.range} params={{date: nextTarget}} className='mani-header-date-btn mani-header-date-next'>向后 <span className='arrow'></span></Link>
        </div>

        <Link to={DateStore.range} params={{date: todayText}} className='btn btn-normal'>今天</Link>

        <ul className='mani-header-view-switch'>
          <li><Link to='day' params={{date: DateStore.dateText}}>日</Link></li>
          <li><Link to='week' params={{date: DateStore.dateText}}>周</Link></li>
          <li><Link to='month' params={{date: DateStore.dateText}}>月</Link></li>
        </ul>
      </header>
    );
  }

  prev(Date) {

    switch (Date.range) {
    case 'day':
      return dateUtils.formatTime(dateUtils.addDate(Date.date, -1));
    case 'week':
      return dateUtils.formatTime(dateUtils.addWeek(Date.date, -1));
    case 'month':
      return dateUtils.formatTime(dateUtils.addMonth(Date.date, -1));
    }
  }

  next(Date) {

    switch (Date.range) {
    case 'day':
      return dateUtils.formatTime(dateUtils.addDate(Date.date, 1));
    case 'week':
      return dateUtils.formatTime(dateUtils.addWeek(Date.date, 1));
    case 'month':
      return dateUtils.formatTime(dateUtils.addMonth(Date.date, 1));
    }
  }
};