/**
 * Created by AshZhang on 15/9/8.
 */


'use strict';

import 'whatwg-fetch';
import Events from 'events';


class ReactStore extends Events {

  /**
   * Constructor
   * @param {Object}    [options]
   * @param {*}         [options.data]
   * @param {string}    [options.idAttr]
   * @param {string}    [options.rootUrl]
   * @param {Function}  [options.init]
   * @param {Function}  [options.errorHandler]
   */
  constructor(options = {}) {
    super();

    // All data are stored at `data` property
    this.data = (!options || options.data === undefined)
                  ? []
                  : options.data;

    this.idAttr = options.idAttr || 'id';
    this.rootUrl = options.rootUrl;

    this.errorHandler = () => {
      if (typeof options.errorHandler === 'function') {
        options.errorHandler();
      }
    };

    if (typeof options.init === 'function') {
      options.init.call(this);
    }
  }

  /**
   * Edit data and emit a `change` event
   * @param {*} newState
   */
  setState(newState) {
    this.data = newState;
    this.emit('change');
  }


  // RESTful
  // ---------------------------

  read(id) {

    this._get(id)
      .then((data) => {

        if (Array.isArray(data)) {
          this.setState(data);
        } else {
          this.setState([data]);
        }
      });
  }

  create(item) {
    let data = this.data;

    this._save(item)
      .then((res) => {
        this.setState(data.concat(res));
      })
      .catch((err) => {
        this.errorHandler(err);
      });
  }

  update(item) {
    let data = this.data;

    this._save(item)
      .then(() => {
        const itemIndex = this.findIndex(item);

        if (itemIndex > -1) {
          data[itemIndex] = item;
          this.setState(data);
        }
      })
      .catch((err) => {
        this.errorHandler(err);
      });
  }

  delete(id) {
    let data = this.data;

    this._remove(id)
      .then(() => {
        const itemIndex = this.findIndexById(id);

        if (itemIndex > -1) {
          this.setState(data.slice(0, itemIndex).concat(data.slice(itemIndex + 1)));
        }
      })
      .catch((err) => {
        this.errorHandler(err);
      });
  }


  // API
  // ---------------------------

  /**
   * Find the item's index in data array
   * @param {Object} item
   * @returns {number}
   */
  findIndex(item) {
    return this.findIndexById(item[this.idAttr]);
  }

  /**
   * Find the item's index by its id
   * @param {*} id
   * @returns {number}
   */
  findIndexById(id) {
    const idAttr = this.idAttr;

    for (let i = 0; i < this.data.length; i++) {
      if (id === this.data[i][idAttr]) {
        return i;
      }
    }

    return -1;
  }


  // Fetch
  // ---------------------------

  _get(id) {

    if (id !== undefined) {
      return fetch([this.rootUrl, id].join('/'))
        .then((res) => {
          return res.json();
        });
    } else {
      return fetch(this.rootUrl)
        .then((res) => {
          return res.json();
        });
    }
  }

  _save(item) {
    const id = item[this.idAttr];

    if (id) {
      return fetch([this.rootUrl, id].join('/'), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
    } else {
      return fetch(this.rootUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((res) => {
          return res.json();
        });
    }
  }

  _remove(id) {
    return fetch([this.rootUrl, id].join('/'), {
      method: 'DELETE'
    });
  }
}


export default ReactStore;