export default class LoginPage {
  async render() {
    return `
      <main id="main-content" tabindex="-1">
        <h1>Login</h1>
        <form id="login-form">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required minlength="8" />
          <button type="submit">Login</button>
        </form>
        <div id="login-error" style="color:red;margin-top:8px;"></div>
        <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </main>
    `;
  }

  bindSubmit(handler) {
    document.getElementById('login-form').onsubmit = handler;
  }

  renderError(msg) {
    document.getElementById('login-error').textContent = msg;
  }
} 