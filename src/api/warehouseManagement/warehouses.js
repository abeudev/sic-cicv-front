import { http } from '../http-service';

// ======= User Management
const GET_ALL_URL = `warehouse/table`;
const GET_ONE_URL = (id) => `warehouse/${id}`;
const ACTION_URL = `warehouse`;

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

