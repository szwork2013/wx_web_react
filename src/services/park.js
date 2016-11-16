import request from '../utils/request';
import qs from 'qs'

export async function getParks(params) {
  // return request(`/api/users?${qs.stringify(params)}`)
  return request(`park?${qs.stringify(params)}`)
}
