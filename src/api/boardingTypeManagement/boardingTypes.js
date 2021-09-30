import { http } from '../http-service';

// ======= User Management
const GET_USERS_URL = `boardingtype/table`;
const GET_USER_URL = (id) => `boardingtype/${id}`;
const ACTION_USER_URL = `boardingtype`;
const MY_PROFILE_URL = `boardingtype/my-profile`;
const MY_PROFILE_IMAGE_URL = `boardingtype/my-profile/image`;

export function getUsers(data) {
  return http().post(GET_USERS_URL, data);
}

export function getUser(id) {
  return http().get(GET_USER_URL(id));
}

export function updateUser(data) {
  return http().put(ACTION_USER_URL, data);
}

export function newUser(data) {
  return http().post(ACTION_USER_URL, data);
}

// ======= My Profile
export function getMyProfile() {
  return http().get(MY_PROFILE_URL);
}

export function updateMyProfile(data) {
  return http().put(MY_PROFILE_URL, data);
}

export function updateMyProfileImage(data) {
  return http().put(MY_PROFILE_IMAGE_URL, data);
}