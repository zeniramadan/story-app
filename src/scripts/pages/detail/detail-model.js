import { getStoryDetail } from '../../data/api';

class DetailModel {
  getToken() {
    return localStorage.getItem('token');
  }

  async getDetail(id) {
    const token = this.getToken();
    if (!token || !id) return null;
    const res = await getStoryDetail(id, token);
    if (!res.error) return res.story;
    return null;
  }
}

export default DetailModel; 