/**
 * Created by AshZhang on 15/8/26.
 */


'use strict';


function parameterize(data) {
  if (!data) return '';

  const keys = Object.keys(data);
  let result = '';

  if (keys.length) {
    keys.forEach(function (key) {
      result += ('&' + key + '=' + data[key]);
    });
    return result.slice(1);
  }

  return '';
}


function ajax({
  method = 'get',
  url = '',
  async = true,
  contentType = '',
  data = null
}) {

  return new Promise(function (resolve, reject) {
    var http = new window.XMLHttpRequest();

    http.onreadystatechange = function () {

      if (http.readyState === 4) {
        const status = http.status;
        let res;

        if (status >= 200 && status < 400) {

          try {
            res = JSON.parse(http.responseText);
            resolve(res);
          } catch (e) {
            resolve(http.responseText);
          }
        } else {

          try {
            res = JSON.parse(http.responseText);
            reject(res);
          } catch (e) {
            reject(http.responseText);
          }
        }
      }
    };

    http.open(method, url, async);

    if (contentType) {
      http.setRequestHeader('Content-Type', contentType);
    }

    http.send(data);
  });
}


function get(url, data) {

  return ajax({
    method: 'get',
    url: url + (data ? '?' + parameterize(data) : '')
  });
}


function post(url, data) {

  return ajax({
    method: 'post',
    url: url,
    contentType: 'application/x-www-form-urlencoded',
    data: parameterize(data)
  });
}


function put(url, data) {

  return ajax({
    method: 'put',
    url: url,
    contentType: 'application/x-www-form-urlencoded',
    data: parameterize(data)
  });
}


function remove(url, data) {

  return ajax({
    method: 'delete',
    url: url,
    data: data
  });
}


export default {
  get: get,
  post: post,
  put: put,
  delete: remove
};