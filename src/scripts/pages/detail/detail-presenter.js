import { getStoryDetail } from '../../data/api';
import { parseActivePathname } from '../../routes/url-parser';

export default class DetailPresenter {
  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    const token = localStorage.getItem('token');
    const { id } = parseActivePathname();
    let story = null;
    if (token && id) {
      const res = await getStoryDetail(id, token);
      if (!res.error) {
        story = res.story;
      }
    }
    this.view.renderDetail(story);
  }
} 