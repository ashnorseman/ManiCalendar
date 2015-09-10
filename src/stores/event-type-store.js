/**
 * Created by AshZhang on 15/9/8.
 */


'use strict';

import Store from '../utils/react-store';
import CONF from '../config';


export default new Store({
  rootUrl: CONF.API_ROOT + 'eventTypes',
  init: function () {
    this.read();
  }
});