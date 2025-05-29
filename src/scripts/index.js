import '../styles/styles.css';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    updateLogoutButton();
  });

  function updateLogoutButton() {
    const logoutLi = document.getElementById('logout-li');
    if (!logoutLi) return;
    if (localStorage.getItem('token')) {
      logoutLi.style.display = '';
    } else {
      logoutLi.style.display = 'none';
    }
  }

  updateLogoutButton();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem('token');
      updateLogoutButton();
      window.location.hash = '#/login';
    };
  }

  const mainContent = document.querySelector("#main-content");
  const skipLink = document.querySelector(".skip-link");
  if (skipLink && mainContent) {
    skipLink.addEventListener("click", function (event) {
      event.preventDefault();
      skipLink.blur();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.scrollIntoView();
    });
  }
});
