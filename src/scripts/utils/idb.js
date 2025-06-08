import { openDB } from 'idb';

const DB_NAME = 'story-app-db';
const STORE_NAME = 'stories';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export async function saveStory(story) {
  return (await dbPromise).put(STORE_NAME, story);
}

export async function getAllStories() {
  return (await dbPromise).getAll(STORE_NAME);
}

export async function deleteStory(id) {
  return (await dbPromise).delete(STORE_NAME, id);
}

export async function getStoryById(id) {
  return (await dbPromise).get(STORE_NAME, id);
} 