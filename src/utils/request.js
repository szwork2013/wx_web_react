import fetch from 'dva/fetch';
import { hashHistory } from 'dva/router'
import {message} from 'antd'
// import fetch from 'whatwg-fetch'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseErrorMessage(data) {
  const { errcode, errmsg } = data;
  if (errcode !== 1000) {
    throw new Error(errmsg);
  }
  return data;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  if(process.env.NODE_ENV === 'production'){
    // url = 'http://203.195.178.77:9000/web/v1/' + url
    url = '/web/v1/' + url
  }
  else {
    url = 'http://localhost:8080/web/v1/' + url
  }
  options = options || {}
  options.headers = options.headers || {}
  options.headers['token'] = localStorage.getItem('token')

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(parseErrorMessage)
    .then((data) => {
      return data.data
    })
    .catch((err) => {
      switch (err.message) {
        case '登录失效':
          hashHistory.push({pathname: '/login'})
          break
        default:
          message.error(err.message, 3);
          break
      }
      return undefined
    });
}
