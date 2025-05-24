export default class AddPage {
  async render() {
    return `
      <main id="main-content" tabindex="-1">
        <h1>Tambah Cerita</h1>
        <form id="add-form">
          <label for="description">Deskripsi</label>
          <textarea id="description" name="description" required aria-required="true" rows="3" style="resize:vertical;width:100%;max-width:400px;"></textarea>
          <div style="margin:8px 0;">
            <button type="button" id="open-camera-btn">Buka Kamera</button>
            <video id="video" width="320" height="240" autoplay playsinline style="display:none;border-radius:8px;"></video>
            <button type="button" id="capture-btn" style="display:none;">Ambil Foto</button>
            <img id="photo-preview" alt="Preview Foto hasil kamera" style="display:none;width:120px;margin-top:8px;border-radius:8px;object-fit:cover;" />
            <button type="button" id="close-camera-btn" style="display:none;">Tutup Kamera</button>
          </div>
          <label for="lat">Latitude</label>
          <input id="lat" name="lat" required readonly aria-required="true" />
          <label for="lon">Longitude</label>
          <input id="lon" name="lon" required readonly aria-required="true" />
          <div id="map" style="height:300px;margin-bottom:1em;background:#eee;">[Peta akan tampil di sini]</div>
          <button type="submit">Kirim</button>
          <div id="add-loading" class="loading" style="display:none;text-align:center;margin:16px 0;">
            <span class="loading-spinner"></span> Menyimpan data...
          </div>
          <div id="add-error" style="color:red;margin-top:8px;"></div>
        </form>
      </main>
    `;
  }

  bindSubmit(handler) {
    document.getElementById('add-form').onsubmit = handler;
  }

  bindCameraEvents({ onOpen, onCapture, onClose }) {
    document.getElementById('open-camera-btn').onclick = onOpen;
    document.getElementById('capture-btn').onclick = onCapture;
    document.getElementById('close-camera-btn').onclick = onClose;
  }

  showCameraUI(show) {
    document.getElementById('video').style.display = show ? '' : 'none';
    document.getElementById('capture-btn').style.display = show ? '' : 'none';
    document.getElementById('close-camera-btn').style.display = show ? '' : 'none';
  }

  showPhotoPreview(dataUrl) {
    const img = document.getElementById('photo-preview');
    if (dataUrl) {
      img.src = dataUrl;
      img.style.display = '';
    } else {
      img.src = '';
      img.style.display = 'none';
    }
  }

  renderError(msg) {
    document.getElementById('add-error').textContent = msg;
  }

  showLoading(isLoading) {
    const loading = document.getElementById('add-loading');
    if (loading) loading.style.display = isLoading ? '' : 'none';
  }
} 