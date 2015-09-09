/**
 * Created by AshZhang on 15/9/8.
 */


'use strict';

import Store from '../utils/react-store';


export default new Store({
  data: [],
  rootUrl: (location.toString().indexOf('localhost') > 0 ? 'http://localhost:9090/' : '/') + 'eventTypes',
  init: function () {
    this.read();
  }
});