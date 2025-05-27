import LoginModel from './login-model';
import LoginPage from './login-page';

export default class LoginPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
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
      const res = await this.model.loginUser({ email, password });
      if (!res.error && res.loginResult && res.loginResult.token) {
        this.model.saveToken(res.loginResult.token);
        this.view.showAlert('Login berhasil!');
        this.view.redirectToHome();
      } else {
        this.view.renderError(res.message || 'Login gagal');
      }
    });
  }
} 