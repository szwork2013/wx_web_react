import request from '../utils/request';
import qs from 'qs'

export async function getParks(params) {
  // return request(`/api/users?${qs.stringify(params)}`)
  return request(`park?${qs.stringify(params)}`)
}

export async function getRegions(params) {
  // return request(`/api/users?${qs.stringify(params)}`)
  return request(`region?${qs.stringify(params)}`)
}

export async function getDevices(params) {
  return request(`device?${qs.stringify(params)}`)
}