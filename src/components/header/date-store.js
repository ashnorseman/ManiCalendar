/**
 * Created by AshZhang on 15/8/29.
 */


'use strict';


import Store from '../utils/react-store';
import dateUtils from '../utils/dateUtils';


class DateStore extends Store {

  refactor() {

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
      range: this.range,
      date: this.date,
      rangeStart,
      rangeEnd,
      dateText: dateUtils.formatTime(this.date),
      rangeStartText: dateUtils.formatTime(rangeStart, 'YYYY/MM/DD'),
      rangeEndText: dateUtils.formatTime(rangeEnd, 'YYYY/MM/DD')
    });
  }
}


export default new DateStore({

  init() {

    // Bind events
    window.addEventListener('hashchange', () => {
      this.refactor();
    }, false);
  }
});