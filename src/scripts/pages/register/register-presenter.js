import RegisterModel from './register-model';
import RegisterPage from './register-page';

export default class RegisterPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async afterRender() {
    this.view.bindSubmit(async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      if (!name || !email || !password) {
        this.view.renderError('Semua field wajib diisi!');
        return;
      }
      const res = await this.model.registerUser({ name, email, password });
      if (!res.error) {
        this.view.showAlert('Registrasi berhasil, silakan login!');
        this.view.redirectToLogin();
      } else {
        this.view.renderError(res.message || 'Registrasi gagal');
      }
    });
  }
} 