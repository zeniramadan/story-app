import { login } from '../../data/api';
import LoginPage from './login-page';

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    this.view.bindSubmit(async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      if (!email || !password) {
        this.view.renderError('Email dan password wajib diisi!');
        return;
      }
      const res = await login({ email, password });
      if (!res.error && res.loginResult && res.loginResult.token) {
        localStorage.setItem('token', res.loginResult.token);
        alert('Login berhasil!');
        window.location.hash = '#/';
      } else {
        this.view.renderError(res.message || 'Login gagal');
      }
    });
  }
} 