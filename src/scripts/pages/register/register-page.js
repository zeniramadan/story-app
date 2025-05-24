export default class RegisterPage {
  async render() {
    return `
      <section class="auth-section">
        <div class="auth-card">
          <h1><i class='fa-solid fa-user-plus' style='color:#6C63FF;margin-right:8px;'></i>Register</h1>
          <form id="register-form">
            <label for="name"><i class='fa-solid fa-user' style='margin-right:6px;'></i>Nama</label>
            <input id="name" name="name" required />
            <label for="email"><i class='fa-solid fa-envelope' style='margin-right:6px;'></i>Email</label>
            <input id="email" name="email" type="email" required />
            <label for="password"><i class='fa-solid fa-lock' style='margin-right:6px;'></i>Password</label>
            <input id="password" name="password" type="password" required minlength="8" />
            <button type="submit"><i class='fa-solid fa-user-plus' style='margin-right:6px;'></i>Register</button>
          </form>
          <div id="register-error" style="color:red;margin-top:8px;"></div>
          <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
        </div>
      </section>
    `;
  }

  bindSubmit(handler) {
    document.getElementById('register-form').onsubmit = handler;
  }

  renderError(msg) {
    document.getElementById('register-error').textContent = msg;
  }
} 