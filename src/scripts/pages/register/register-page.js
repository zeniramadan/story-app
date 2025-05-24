export default class RegisterPage {
  async render() {
    return `
      <main id="main-content" tabindex="-1">
        <h1>Register</h1>
        <form id="register-form">
          <label for="name">Nama</label>
          <input id="name" name="name" required />
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required minlength="8" />
          <button type="submit">Register</button>
        </form>
        <div id="register-error" style="color:red;margin-top:8px;"></div>
        <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </main>
    `;
  }

  bindSubmit(handler) {
    document.getElementById('register-form').onsubmit = handler;
  }

  renderError(msg) {
    document.getElementById('register-error').textContent = msg;
  }
} 