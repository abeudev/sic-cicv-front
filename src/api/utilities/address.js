import { http } from '../http-service';

const GET_COUNTRIES = `countries`;
const GET_STATES = (countryID) => `states?country_id=${countryID}`;
const GET_CITIES = (stateID) => `cities?state_id=${stateID}`;

export function getCountries() {
  return http().get(GET_COUNTRIES);
}

export function getStates(countryID) {
  return http().get(GET_STATES(countryID));
}

export function getCities(stateID) {
  return http().get(GET_CITIES(stateID));
}