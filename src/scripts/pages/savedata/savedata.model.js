import { saveStory, getAllStories, deleteStory } from '../../utils/idb';

const SavedataModel = {
  async save(story) {
    return saveStory(story);
  },
  async getAll() {
    return getAllStories();
  },
  async delete(id) {
    return deleteStory(id);
  },
};

export default SavedataModel;

