import { http } from '../http-service';

// ======= User Management
const GET_ALL_URL = `colis/table`;
const GET_ONE_URL = (id) => `colis/${id}`;
const ACTION_URL = `colis`;

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

