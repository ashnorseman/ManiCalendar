/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';


import './header.less';

import React from 'react';
import { Link } from 'react-router';
import Component from '../../utils/react-store-component';

import dateUtils from '../../utils/dateUtils';


export default class Header extends Component {

  constructor(prop) {
    super(prop);

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  render() {
    const dateStore = this.props.stores.date;
    const prevTarget = this.prev(dateStore.data);
    const nextTarget = this.next(dateStore.data);
    const todayText = dateUtils.formatTime(Date.now());

    return (
      <header className='mani-header'>
        <div className='mani-header-date-switch'>
          <Link to={dateStore.data.range} params={{date: prevTarget}} className='mani-header-date-btn mani-header-date-prev'>向前 <span className='arrow'></span></Link>
          <span className='mani-header-date-range'>{
            dateStore.data.range === 'day'
              ? dateStore.data.rangeStartText
              : `${dateStore.data.rangeStartText} – ${dateStore.data.rangeEndText}`
          }</span>
          <Link to={dateStore.data.range} params={{date: nextTarget}} className='mani-header-date-btn mani-header-date-next'>向后 <span className='arrow'></span></Link>
        </div>

        <Link to={dateStore.data.range} params={{date: todayText}} className='btn btn-normal'>今天</Link>

        <ul className='mani-header-view-switch'>
          <li><Link to='day' params={{date: dateStore.data.dateText}}>日</Link></li>
          <li><Link to='week' params={{date: dateStore.data.dateText}}>周</Link></li>
          <li><Link to='month' params={{date: dateStore.data.dateText}}>月</Link></li>
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