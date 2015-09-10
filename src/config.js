/**
 * Created by AshZhang on 15/9/10.
 */


'use strict';


const CONF = (function () {

  return {
    API_ROOT: location.toString().indexOf('localhost') > 0 ? 'http://localhost:9090/' : '/'
  };
}());

export default CONF;