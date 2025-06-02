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

  async getLocationName(lat, lon) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      return data.display_name || 'Lokasi tidak diketahui';
    } catch {
      return 'Lokasi tidak diketahui';
    }
  }
}

export default AddModel; 