/**
 * Created by AshZhang on 15/8/28.
 */


'use strict';


export default {


  /**
   * Add a `0` before single digits
   * @param num {number}
   * @returns {string}
   */
  addZero: function (num) {

    if (num >= 0 && num < 10) {
      return '0' + num;
    } else if (num < 0 && num > -10) {
      return '-0' + Math.abs(num);
    }

    if (isNaN(num)) {
      return '';
    }

    return '' + num;
  },


  /**
   * Add certain dates to a date
   * @param {number|Date} timestamp - original date
   * @param {number} dates - positive: future, negative: past
   * @returns {Date}
   */
  addDate: function (timestamp, dates) {
    var date = new Date(timestamp);

    return new Date(date.valueOf() + 1000 * 60 * 60 * 24 * dates);
  },


  /**
   * Add certain weeks to a date
   * @param {number|Date} timestamp - original date
   * @param {number} weeks - positive: future, negative: past
   * @returns {Date}
   */
  addWeek: function (timestamp, weeks) {
    return this.addDate(timestamp, weeks * 7);
  },


  /**
   * Add certain months to a date
   * @param {number|Date} timestamp - original date
   * @param {number} months - positive: future, negative: past
   * @returns {Date}
   */
  addMonth: function (timestamp, months) {
    var date = new Date(timestamp),
        curMonth, result;

    curMonth = date.getMonth();
    result = new Date(new Date(timestamp).setMonth(curMonth + months));

    if (result.getDate() !== date.getDate()) {
      result = new Date(result.setDate(0));
    }

    return result;
  },


  /**
   * Calculate start and end period of a time range
   * @param {number|Date} date
   * @param {string} range
   * @returns {*|{rangeStart, rangeEnd}|{rangeStart: Number, rangeEnd: number}}
   */
  calRange: function (date, range) {

    switch (range) {
    case 'day':
      return this.getDayRange(date);
    case 'week':
      return this.getWeekRange(date);
    case 'month':
      return this.getShowMonthRange(date);
    }
  },


  /**
   * Create an array from 0 to end
   * @returns {Array}
   */
  createArray: function (end) {
    let result = [];

    for (let i = 0; i < end; i += 1) {
      result.push(i);
    }

    return result;
  },


  /**
   * Formats a timestamp (in seconds)
   *  - supports: YYYY (2014), MM (09), DD (01), mm (9), dd (1)
   * @param timestamp {number|string}
   * @param {string} [format]
   * @returns {string}
   */
  formatTime: function (timestamp, format) {
    var time = new Date(timestamp),
        year = time.getFullYear(),
        month = time.getMonth() + 1,
        date = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds(),
        map = {
          YYYY: year,
          MM: this.addZero(month),
          M: month,
          DD: this.addZero(date),
          dd: date,
          HH: this.addZero(hour),
          hh: hour,
          mm: this.addZero(minute),
          m: minute,
          SS: this.addZero(second),
          ss: second
        };

    format = format || 'YYYY-MM-DD';

    return format.replace(/(YYYY)|(MM)|(\bM\b)|(DD)|(dd)|(HH)|(hh)|(mm)|(\bm\b)|(SS)|(ss)/g, function (match) {
      return map[match];
    });
  },


  /**
   * Get the start and end time of a day
   * @param timestamp {Number}
   * @returns {{rangeStart: Number, rangeEnd: number}}
   */
  getDayRange: function (timestamp) {
    var rangeStart = this.trimHours(timestamp),
        rangeEnd = new Date(rangeStart).setDate(new Date(rangeStart).getDate() + 1) - 1;

    return {rangeStart, rangeEnd};
  },


  /**
   * Get the start and end time of a week
   * @param timestamp {Number}
   * @returns {{rangeStart: Number, rangeEnd: number}}
   */
  getWeekRange: function (timestamp) {
    var time = new Date(timestamp),
        day = time.getDay(),
        rangeStart = this.trimHours(timestamp - 1000 * 60 * 60 * 24 * day),
        rangeEnd = new Date(rangeStart).setDate(new Date(rangeStart).getDate() + 7) - 1;

    return {rangeStart, rangeEnd};
  },


  /**
   * Get the start and end time of a week
   * @param timestamp {Number}
   * @returns {{rangeStart: Number, rangeEnd: number}}
   */
  getMonthRange: function (timestamp) {
    var time = new Date(timestamp),
        rangeStart = this.trimHours(time.setDate(1)),
        rangeEnd = new Date(rangeStart).setMonth(time.getMonth() + 1) - 1;

    return {rangeStart, rangeEnd};
  },


  /**
   * Get the start and end time of a month shown in calendar view
   * - previous and trailing dates of other months
   * @param timestamp {Number}
   * @returns {{rangeStart: Number, rangeEnd: number}}
   */
  getShowMonthRange: function (timestamp) {
    var monthRange = this.getMonthRange(timestamp),
        rangeStart = this.getWeekRange(monthRange.rangeStart).rangeStart,
        rangeEnd = this.getWeekRange(monthRange.rangeEnd).rangeEnd;

    return {rangeStart, rangeEnd};
  },


  /**
   * Remove hour, minutes, seconds and milliseconds
   * @param timestamp {Number}
   * @returns {Number}
   */
  trimHours: function (timestamp) {
    var time = new Date(timestamp),
        year = time.getFullYear(),
        month = time.getMonth(),
        date = time.getDate();

    return new Date(year, month, date).valueOf();
  }
};