import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { addPresenter } from '../routes/routes';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  lastUrl = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      })
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];
    if (this.lastUrl === '/add' && url !== '/add' && addPresenter && typeof addPresenter.destroy === 'function') {
      addPresenter.destroy();
    }
    this.lastUrl = url;
    if (url === '/add' && !localStorage.getItem('token')) {
      window.location.hash = '#/login';
      return;
    }
    this.#content.innerHTML = '<div class="loading" style="margin:64px 0;"><span class="loading-spinner"></span> Memuat...</div>';
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      });
    } else {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    }
  }
}

export default App;
