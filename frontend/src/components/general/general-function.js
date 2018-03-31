import moment from 'moment'

var common = {}
var cookies = {};
common.install = function (Vue, option) {

  var loggingOn = option.loggingOn === undefined ? true :
    option.loggingOn;

  Vue.prototype.momment = moment;

  Vue.prototype.toCamelCase = function (obj) {
    function toCamel(o) {
      var newO, origKey, newKey, value;
      if (o instanceof Array) {
        newO = [];
        for (origKey in o) {
          value = o[origKey]
          if (typeof value === "object") {
            value = toCamel(value)
          }
          newO.push(value)
        }
      } else {
        newO = {}
        for (origKey in o) {
          if (o.hasOwnProperty(origKey)) {
            newKey = _.camelCase(origKey)
            value = o[origKey];
            if (value instanceof Array || (value !== null &&
                value.constructor === Object)) {
              value = toCamel(value)
            }
            newO[newKey] = value
          }
        }
      }
      return newO;
    }
    return toCamel(obj)
  }

  Vue.prototype.logger = function (label, object) {
    if (loggingOn) {
      console.log(label, object);
    }
  }

  Vue.prototype.createCookie = function (name, value, days) {
    var expires = "";
    if (!days) {
      days = 1
    }
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 *
      1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires +
      "; path=/";
  }

  Vue.prototype.readCookie = function (a) {
    var b = document.cookie.match('(^|;)\\s*' + a +
      '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  Vue.prototype.eraseCookie = function (name) {
    document.cookie = name +
      '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}

export default common;