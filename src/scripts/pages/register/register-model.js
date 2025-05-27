import { register } from '../../data/api';

class RegisterModel {
  async registerUser({ name, email, password }) {
    return await register({ name, email, password });
  }
}

export default RegisterModel; 