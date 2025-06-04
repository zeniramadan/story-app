// service-worker.js
self.addEventListener("push", (event) => {
    const payload = event.data?.json();
  
    const title = payload.title || "Notifikasi Baru!";
    const options = payload.options || {
      body: "Ada sesuatu yang baru.",
      icon: "/assets/icon.png",
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  }); 