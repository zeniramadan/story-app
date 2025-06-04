const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
    } catch (e) {
      console.error('Gagal mendaftar service worker', e);
    }
  }
}

export async function isSubscribed() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  return !!sub;
}

export async function subscribePush(token) {
  const izin = await Notification.requestPermission();
  if (izin !== 'granted') throw new Error('Izin notifikasi ditolak.');
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
  const { subscribeNotification } = await import('../data/api.js');
  await subscribeNotification(token, {
    endpoint: sub.endpoint,
    keys: {
      p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))),
      auth: btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth'))))
    }
  });
  return true;
}

export async function unsubscribePush(token) {
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (sub) {
    const { unsubscribeNotification } = await import('../data/api.js');
    await unsubscribeNotification(token, sub.endpoint);
    await sub.unsubscribe();
    return true;
  }
  return false;
} 