/**
 * Created by AshZhang on 15/8/29.
 */


'use strict';


import alt from '../../libs/alt';

import DateActions from '../actions/DateActions';
import dateUtils from '../utils/dateUtils';


class DateStore {

  constructor() {
    this.bindActions(DateActions);

    this.date = null;
    this.range = null;

    this.exportPublicMethods({
      init: this.init.bind(this)
    });

    window.addEventListener('hashchange', () => {
      this.init();
    }, false);
  }

  init() {

    // Check route validity
    let doRelocate = false;

    const hash = location.hash.slice(1).split('/').slice(1);
    let range, date;


    if (!hash[0] || ['day', 'week', 'month'].indexOf(hash[0]) === -1) {
      doRelocate = true;
      range = 'day';
    } else {
      range = hash[0];
    }

    if (!hash[1]) {
      doRelocate = true;
      date = dateUtils.formatTime(Date.now());
    } else {
      date = dateUtils.formatTime(hash[1]);
    }

    if (doRelocate) {
      location.hash = '/' + range + '/' + date;
    }

    // Init date and range
    this.date = new Date(date);
    this.range = range;
    this._update();
  }

  setDate(date) {
    this.date = date;
    this._update();
  }

  setRange(range) {
    this.range = range;
    this._update();
  }

  _update() {
    const {rangeStart, rangeEnd} = dateUtils.calRange(this.date, this.range);

    this.setState({
      rangeStart,
      rangeEnd,
      dateText: dateUtils.formatTime(this.date),
      rangeStartText: dateUtils.formatTime(rangeStart, 'YYYY/MM/DD'),
      rangeEndText: dateUtils.formatTime(rangeEnd, 'YYYY/MM/DD')
    });
  }
}


export default alt.createStore(DateStore, 'DateStore');