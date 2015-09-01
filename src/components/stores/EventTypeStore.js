/**
 * Created by AshZhang on 15/9/1.
 */


'use strict';


import alt from '../../libs/alt';

import ajax from '../utils/ajax';

const ROOT = location.toString().indexOf('localhost') > 0 ? 'http://localhost:9090/' : '/';


class EventTypeStore {

  constructor() {
    this.eventTypes = [];

    ajax.get(ROOT + 'eventTypes')
      .then((res) => {
        this.setState({
          eventTypes: res
        });
      });
  }
}


export default alt.createStore(EventTypeStore, 'EventTypeStore');