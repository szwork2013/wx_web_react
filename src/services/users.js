import request from '../utils/request';
import qs from 'qs'

export async function loginSer(params) {
  // return request(`/user/login?${qs.stringify(params)}`)
  // return request(`mark`)
  return request('user/login', {
    method: 'post',
    // mode: "no-cors",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}
