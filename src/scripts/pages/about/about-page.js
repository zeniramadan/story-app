export default class AboutPage {
  async render() {
    return `
      <section class="about-section">
        <div class="about-card">
          <!--<div class="about-avatar">
            <img src="images/logo.png" alt="Logo" />
          </div>-->
          <h1><i class='fa-solid fa-circle-user' style='color:#6C63FF;margin-right:8px;'></i>Tentang Story App</h1>
          <p class="about-desc">
            <span style="font-size:1.1rem;">Story App adalah aplikasi berbagi cerita berbasis lokasi yang dibuat dengan cinta untuk submission Dicoding. Anda dapat menulis cerita, mengunggah foto, dan membagikan lokasi Anda ke seluruh Indonesia.</span>
          </p>
          <div class="about-team">
            <h2><i class="fa-solid fa-users" style="color:#5BC0EB;margin-right:8px;"></i>Pengembang</h2>
            <ul>
              <li><i class="fa-solid fa-user" style="color:#FFD803;margin-right:6px;"></i>ZENI RAMADAN</li>
              <!-- Tambahkan anggota tim lain di sini jika ada -->
            </ul>
          </div>
          <div class="about-social">
            <a href="https://github.com/zeniramadan" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
            <a href="fc482d5y1863@student.devacademy.id" title="Email"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </section>
    `;
  }
}
