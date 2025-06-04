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

  // === PUSH NOTIFICATION MVP ===
  const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';
  const subscribeBtn = document.getElementById('subscribe-notif-btn');
  const unsubscribeBtn = document.getElementById('unsubscribe-notif-btn');

  // Model
  const NotificationModel = {
    async isSubscribed() {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      return !!sub;
    },
    async getSubscription() {
      const reg = await navigator.serviceWorker.ready;
      return reg.pushManager.getSubscription();
    }
  };

  // View
  function updateNotifButtons(subscribed) {
    if (subscribed) {
      subscribeBtn.style.display = 'none';
      unsubscribeBtn.style.display = '';
    } else {
      subscribeBtn.style.display = '';
      unsubscribeBtn.style.display = 'none';
    }
  }

  // Presenter
  async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/service-worker.js');
      } catch (e) {
        console.error('Gagal mendaftar service worker', e);
      }
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }

  async function subscribePush() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login terlebih dahulu untuk mengaktifkan notifikasi!');
      return;
    }
    const izin = await Notification.requestPermission();
    if (izin !== 'granted') {
      alert('Izin notifikasi ditolak.');
      return;
    }
    await registerServiceWorker();
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    // Kirim ke backend
    const { subscribeNotification } = await import('./data/api.js');
    await subscribeNotification(token, {
      endpoint: sub.endpoint,
      keys: {
        p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))),
        auth: btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth'))))
      }
    });
    updateNotifButtons(true);
    alert('Notifikasi diaktifkan!');
  }

  async function unsubscribePush() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      // Hapus dari backend
      const { unsubscribeNotification } = await import('./data/api.js');
      await unsubscribeNotification(token, sub.endpoint);
      await sub.unsubscribe();
      updateNotifButtons(false);
      alert('Notifikasi dimatikan!');
    }
  }

  subscribeBtn.addEventListener('click', subscribePush);
  unsubscribeBtn.addEventListener('click', unsubscribePush);
  NotificationModel.isSubscribed().then(updateNotifButtons);
});
