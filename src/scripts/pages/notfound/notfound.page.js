const NotFoundPage = {
  async render() {
    return `
      <main id="main-content" tabindex="-1" style="text-align:center;padding:64px 0;">
        <h1 style="font-size:3rem;color:#ff4d4f;margin-bottom:16px;"><i class="fa-solid fa-triangle-exclamation"></i> 404</h1>
        <h2 style="color:#232946;margin-bottom:12px;">Halaman Tidak Ditemukan</h2>
        <p style="color:#888;">Alamat yang Anda tuju tidak tersedia.<br>Silakan kembali ke <a href="#/">beranda</a>.</p>
      </main>
    `;
  },
  async afterRender() {}
};

export default NotFoundPage; 