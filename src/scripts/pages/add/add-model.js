import { addStory, addStoryGuest } from '../../data/api';

class AddModel {
  getToken() {
    return localStorage.getItem('token');
  }

  async submitStory(formData) {
    const token = this.getToken();
    if (token) {
      return await addStory(formData, token);
    } else {
      return await addStoryGuest(formData);
    }
  }
}

export default AddModel; 