import DetailModel from './detail-model';
import { parseActivePathname } from '../../routes/url-parser';

export default class DetailPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async afterRender() {
    const { id } = parseActivePathname();
    const story = await this.model.getDetail(id);
    this.view.renderDetail(story);
  }
} 