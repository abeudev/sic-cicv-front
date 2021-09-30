import { http } from '../http-service';

const INSTALL_URL = `init`;
const SETTINGS_URL = `settings`;

export function checkSettings() {
  return http().get(INSTALL_URL);
}

export function installSettings(data) {
  return http().post(INSTALL_URL, data);
}

export function getSettings() {
  return http().get(SETTINGS_URL);
}

export function updateSettings(data) {
  return http().put(SETTINGS_URL, data);
}