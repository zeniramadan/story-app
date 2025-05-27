import { login } from '../../data/api';

class LoginModel {
  async loginUser({ email, password }) {
    return await login({ email, password });
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }
}

export default LoginModel; 