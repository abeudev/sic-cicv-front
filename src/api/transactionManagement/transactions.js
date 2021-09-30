import { http } from '../http-service';

// ======= User Management
const GET_ALL_URL = `transaction/table`;
const GET_ONE_URL = (id) => `transaction/${id}`;
const ACTION_URL = `transaction`;
const GET_TRANSACTION_OPTIONS_URL = `transaction/options`;
const MY_PROFILE_URL = `transaction/my-profile`;
const MY_PROFILE_IMAGE_URL = `transaction/my-profile/image`;

export function getAll(data) {
  return http().post(GET_ALL_URL, data);
}

export function getOne(id) {
  return http().get(GET_ONE_URL(id));
}

export function updateOne(data) {
  return http().put(ACTION_URL, data);
}

export function createOne(data) {
  return http().post(ACTION_URL, data);
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
export function getTransactionOptions() {
  return http().get(GET_TRANSACTION_OPTIONS_URL);
}

