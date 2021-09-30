import axios from 'axios';
import store from '@/store';

/**
 * Instance of Axios module
 * Automatically passes Token in Auth headers for every request
 *
 * @return  {Object}  Axios instance
 */
export function http(options = {}) {
  const jwtToken = getToken();
  const bearerToken = jwtToken ? `Bearer ${jwtToken}` : null;

  return axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      Authorization: options.auth ? options.auth : bearerToken
    }
  });
}

export function getToken() {
  return store.getters['auth/token'];
}