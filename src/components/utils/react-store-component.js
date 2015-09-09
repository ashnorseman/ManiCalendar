/**
 * Created by AshZhang on 15/9/8.
 */


'use strict';

import React, {Component} from 'react';


/**
 * Update data when a store changes
 */
function listenToStore() {
  this.setState(this.state);
}


class StoreComponent extends Component {

  constructor(props) {
    super(props);

    this.state || (this.state = {});
    this.state.stores || (this.state.stores = {});
    this._storeListener = listenToStore.bind(this);
    this.bindStores(this.props.stores);
  }


  // Life cycle
  // ---------------------------

  /**
   * Listen to stores' change
   */
  componentDidMount() {
    if (!this.props.stores) return;

    this.bindStores(this.props.stores);
  }

  componentWillUnmount() {
    const stores = this.state.stores;

    if (!stores) return;

    Object.getOwnPropertyNames(stores).forEach((storeName) => {
      stores[storeName].removeListener('change', this._storeListener);
    });
  }


  // API
  // ---------------------------

  bindStores(stores) {
    if (!stores) return;

    Object.getOwnPropertyNames(stores).forEach((storeName) => {
      const store = stores[storeName];
      this.state.stores[storeName] = store;

      if (store.listeners('change').indexOf(this._storeListener) === -1) {
        store.on('change', this._storeListener);
      }
    });
  }
}


export default StoreComponent;