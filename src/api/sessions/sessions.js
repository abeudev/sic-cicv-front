import { http } from '../http-service';

const LOGIN = `users/login`;
const REGISTER_URL = `users/register`;
const ACTIVATE_URL = `users/activate`;
const FORGOT_PASSWORD_URL = `users/password/mail`;
const RESET_PASSWORD_URL = `users/password/reset`;

export function login(credentials) {
  return http().post(LOGIN, credentials);
}

export function registerUser(data) {
  return http().post(REGISTER_URL, data);
}

export function activateUser(token) {
  const options = {
    auth: `Bearer ${token}`
  }
  return http(options).put(ACTIVATE_URL);
}

export function forgotPassword(data) {
  return http().post(FORGOT_PASSWORD_URL, data);
}

export function resetPassword(data, token) {
  const options = {
    auth: `Bearer ${token}`
  }
  return http(options).put(RESET_PASSWORD_URL, data);
}