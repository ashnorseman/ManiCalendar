/**
 * Created by AshZhang on 15/9/1.
 */


'use strict';


import alt from '../../libs/alt';

import resource from '../utils/react-resource.js';

const ROOT = location.toString().indexOf('localhost') > 0 ? 'http://localhost:9090/' : '/';


class EventTypeStore {

  constructor() {
    this.data = [];
    this.read();
  }
}


new resource(EventTypeStore, 'eventTypes/', {
  rootUrl: ROOT
});


export default alt.createStore(EventTypeStore, 'EventTypeStore');