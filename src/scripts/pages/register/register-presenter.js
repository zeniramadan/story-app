import { register } from '../../data/api';
import RegisterPage from './register-page';

export default class RegisterPresenter {
  constructor(view) {
    this.view = view;
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
      const res = await register({ name, email, password });
      if (!res.error) {
        alert('Registrasi berhasil, silakan login!');
        window.location.hash = '#/login';
      } else {
        this.view.renderError(res.message || 'Registrasi gagal');
      }
    });
  }
} 