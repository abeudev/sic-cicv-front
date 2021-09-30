import { http } from '../http-service';

export function getTableData(url, data) {
  return http().post(url, data);
}

export function updateRowTable(url, data) {
  return http().put(url, data);
}

export function deleteRowTable(url) {
  return http().delete(url);
}