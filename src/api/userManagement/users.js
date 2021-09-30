import { http } from '../http-service';

// ======= User Management
const GET_USERS_URL = `users/table`;
const GET_USER_URL = (id) => `users/${id}`;
const ACTION_USER_URL = `users`;
const MY_PROFILE_URL = `users/my-profile`;
const MY_PROFILE_IMAGE_URL = `users/my-profile/image`;

/******* other */
const GET_USERS_OPTIONS_URL = `roles/options2`;
const GET_TCHAT_USERS_URL = `roles/tchatusers`;


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

/****** get user for select liste */

export function getUserOptions() {
  return http().get(GET_USERS_OPTIONS_URL);
}




export function getTchatUsers(){
  return http().get(GET_TCHAT_USERS_URL);
}