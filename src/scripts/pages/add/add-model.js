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

  async getCurrentLocation() {
    if (!navigator.geolocation) return null;
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000 });
      });
      return { lat: pos.coords.latitude, lon: pos.coords.longitude };
    } catch {
      return null;
    }
  }
}

export default AddModel; 