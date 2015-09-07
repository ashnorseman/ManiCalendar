/**
 * Created by AshZhang on 15/9/7.
 */


'use strict';

import 'whatwg-fetch';


const defaults = {
  cache: false,
  contentType: 'application/json',
  errorHandler(err) {
    console.error(err);
  },
  headers: {},
  idAttr: 'id',
  params: {},
  responseType: 'json',
  rootUrl: '/',
  timeout: 5000,
  transformRequest(data) {
    console.log('request', data);
  },
  transformResponse(data) {
    console.log('response', data);
  },
  withCredentials: true
};


function resource(Store, url, options = {}) {
  const proto = Store.prototype;
  const _options = Store._options = {};

  // Default properties
  Object.getOwnPropertyNames(defaults).forEach(function (prop) {
    _options[prop] = (options[prop] === undefined) ? defaults[prop] : options[prop];
  });

  // Strip trailing slash
  _options.url = url.replace(/\/$/, '');


  // REST API
  // ---------------------------

  proto.read = function (id) {

    this._get(id)
      .then((data) => {

        if (Array.isArray(data)) {
          this.setState({data});
        } else {
          this.setState({
            data: [data]
          });
        }
      });
  };

  proto.create = function (item) {
    let data = this.data;

    this._save(item)
      .then((res) => {

        this.setState({
          data: data.concat(res)
        });
      })
      .catch((err) => {
        _options.errorHandler(err);
      });
  };

  proto.update = function (item) {
    let data = this.data;

    this._save(item)
      .then(() => {
        const itemIndex = this.findIndex(item);

        if (itemIndex > -1) {
          data[itemIndex] = item;
          this.setState({data});
        }
      })
      .catch((err) => {
        _options.errorHandler(err);
      });
  };

  proto.delete = function (id) {
    let data = this.data;

    this._remove(id)
      .then(() => {
        const itemIndex = this.findIndexById(id);

        if (itemIndex > -1) {
          this.setState({
            data: data.slice(0, itemIndex).concat(data.slice(itemIndex + 1))
          });
        }
      })
      .catch((err) => {
        _options.errorHandler(err);
      });
  };

  proto.findIndex = function (item) {
    return this.findIndexById(item[this._getIdAttr()]);
  };

  proto.findIndexById = function (id) {
    const idAttr = this._getIdAttr();

    for (let i = 0; i < this.data.length; i++) {
      if (id === this.data[i][idAttr]) {
        return i;
      }
    }

    return -1;
  };


  // Fetch...
  // ---------------------------

  proto._get = function (id) {

    if (id !== undefined) {
      return fetch([this._getRootUrl(), id].join('/'))
        .then((res) => {
          return res.json();
        });
    } else {
      return fetch(this._getRootUrl())
        .then((res) => {
          return res.json();
        });
    }
  };

  proto._save = function (item) {
    const id = item[this._getIdAttr()];

    if (id) {
      return fetch([this._getRootUrl(), id].join('/'), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
    } else {
      return fetch(this._getRootUrl(), {
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
  };

  proto._remove = function (id) {
    return fetch([this._getRootUrl(), id].join('/'), {
      method: 'DELETE'
    });
  };
  
  
  // Properties
  // ---------------------------

  proto._getRootUrl = function () {
    return _options.rootUrl + _options.url;
  };

  proto._getIdAttr = function () {
    return _options.idAttr;
  };
}


export default resource;