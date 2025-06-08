import SavedataModel from './savedata.model.js';

const SavedataPresenter = (view) => {
  return {
    async loadStories() {
      const stories = await SavedataModel.getAll();
      view.showStories(stories);
    },
    async saveStory(story) {
      await SavedataModel.save(story);
      this.loadStories();
    },
    async deleteStory(id) {
      await SavedataModel.delete(id);
      this.loadStories();
    },
  };
};

export default SavedataPresenter;

