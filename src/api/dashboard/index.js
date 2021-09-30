import { http } from '../http-service';

const GET_WEEKLY_LOGIN_URL = 'dashboard/weekly-login';
const GET_TODAY_LOGIN_URL = 'dashboard/today-login';
const GET_COUNT_USERS_URL = 'dashboard/count/users';
const GET_COUNT_ROLES_URL = 'dashboard/count/roles';
const GET_COUNT_FEEDS_URL = 'dashboard/count/feeds';
const GET_COUNT_ASSETS_URL = 'dashboard/count/assets';

export function getWeeklyLogin() {
  return http().get(GET_WEEKLY_LOGIN_URL);
}

export function getTodayLogin() {
  return http().get(GET_TODAY_LOGIN_URL);
}

export function getCountUsers() {
  return http().get(GET_COUNT_USERS_URL);
}

export function getCountRoles() {
  return http().get(GET_COUNT_ROLES_URL);
}

export function getCountFeeds() {
  return http().get(GET_COUNT_FEEDS_URL);
}

export function getCountAssets() {
  return http().get(GET_COUNT_ASSETS_URL);
}
