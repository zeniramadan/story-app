import CONFIG from '../config';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
  STORIES_GUEST: `${CONFIG.BASE_URL}/stories/guest`,
  NOTIFICATIONS: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

export async function register({ name, email, password }) {
  const res = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getStories() {
  const fetchResponse = await fetch(ENDPOINTS.STORIES);
  return await fetchResponse.json();
}

export async function getStoriesWithAuth(token, params = {}) {
  const url = new URL(ENDPOINTS.STORIES);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getStoryDetail(id, token) {
  const res = await fetch(`${ENDPOINTS.STORIES}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addStory(formData, token) {
  const res = await fetch(ENDPOINTS.STORIES, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
}

export async function addStoryGuest(formData) {
  const res = await fetch(ENDPOINTS.STORIES_GUEST, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function subscribeNotification(token, subscription) {
  const res = await fetch(ENDPOINTS.NOTIFICATIONS, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  return res.json();
}

export async function unsubscribeNotification(token, endpoint) {
  const res = await fetch(ENDPOINTS.NOTIFICATIONS, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ endpoint }),
  });
  return res.json();
}