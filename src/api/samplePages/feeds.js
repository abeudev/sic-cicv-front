import { http } from '../http-service';

const GET_FEEDS_URL = `feeds/table`;
const GET_FEED_URL = (id) => `feeds/${id}`;
const ACTION_FEED_URL = `feeds`;
const GET_FEEDS_OPTIONS_URL = `feeds/options`;
const GET_ALL_TAGS_URL = `feeds/all-tags`;

export function getFeeds(data) {
  return http().post(GET_FEEDS_URL, data);
}

export function getFeed(id) {
  return http().get(GET_FEED_URL(id));
}

export function getFeedOptions() {
  return http().get(GET_FEEDS_OPTIONS_URL);
}

export function updateFeed(data) {
  return http().put(ACTION_FEED_URL, data);
}

export function newFeed(data) {
  return http().post(ACTION_FEED_URL, data);
}

export function getAllTags() {
  return http().get(GET_ALL_TAGS_URL);
}