import { http } from '../http-service';

const GET_ROLES_URL = `roles/table`;
const GET_CURRENT_USER_ROLE_URL = `users/permission`;
const GET_ROLE_URL = (id) => `roles/${id}`;
const ACTION_ROLE_URL = `roles`;
const GET_ROLES_OPTIONS_URL = `roles/options`;
const CHECK_USERS_BY_ROLE_URL = (id) => `roles/${id}/users`;

export function getRoles(data) {
  return http().post(GET_ROLES_URL, data);
}

export function getRole(id) {
  return http().get(GET_ROLE_URL(id));
}

export function getCurrentUserRole() {
  return http().get(GET_CURRENT_USER_ROLE_URL);
}

export function getRoleOptions() {
  return http().get(GET_ROLES_OPTIONS_URL);
}

export function updateRole(data) {
  return http().put(ACTION_ROLE_URL, data);
}

export function newRole(data) {
  return http().post(ACTION_ROLE_URL, data);
}

export function getUsersByRole(id) {
  return http().get(CHECK_USERS_BY_ROLE_URL(id));
}