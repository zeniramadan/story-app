import { addStory, addStoryGuest } from '../../data/api';
import AddPage from './add-page';
import { initMap } from '../../utils/map';
import { Camera } from '../../utils/camera';

async function getLocationName(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    return data.display_name || 'Lokasi tidak diketahui';
  } catch {
    return 'Lokasi tidak diketahui';
  }
}

export default class AddPresenter {
  constructor(view) {
    this.view = view;
    this.camera = null;
    this.photoDataUrl = null;
    this.mapInstance = null;
    this.currentMarker = null;
  }

  async afterRender() {
    // Cek geolokasi
    let lat = -6.2;
    let lon = 106.8;
    let popupText = 'Lokasi Anda';
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000 });
        });
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        document.getElementById('lat').value = lat;
        document.getElementById('lon').value = lon;
        popupText = await getLocationName(lat, lon);
      } catch (e) {
        // Jika gagal, tetap pakai default
        popupText = await getLocationName(lat, lon);
      }
    } else {
      popupText = await getLocationName(lat, lon);
    }

    // Inisialisasi peta dengan marker di lokasi user
    this.mapInstance = initMap({
      id: 'map',
      lat,
      lon,
      zoom: 13,
      onClick: async (latlng) => {
        document.getElementById('lat').value = latlng.lat;
        document.getElementById('lon').value = latlng.lng;
        const name = await getLocationName(latlng.lat, latlng.lng);
        if (this.currentMarker) {
          this.currentMarker.bindPopup(name).openPopup();
        }
      },
      marker: true,
      popupText,
      onMarkerUpdate: (marker) => {
        this.currentMarker = marker;
      },
    });

    // Kamera
    const video = document.getElementById('video');
    this.camera = new Camera(video);
    this.photoDataUrl = null;
    this.view.bindCameraEvents({
      onOpen: async () => {
        await this.camera.startCamera();
        this.view.showCameraUI(true);
      },
      onCapture: () => {
        this.photoDataUrl = this.camera.capturePhoto();
        this.view.showPhotoPreview(this.photoDataUrl);
        this.camera.stopCamera();
        this.view.showCameraUI(false);
      },
      onClose: () => {
        this.camera.stopCamera();
        this.view.showCameraUI(false);
      }
    });

    this.view.bindSubmit(async (e) => {
      e.preventDefault();
      const form = e.target;
      const description = form.description.value;
      const lat = form.lat.value;
      const lon = form.lon.value;
      if (!this.photoDataUrl) {
        this.view.renderError('Ambil foto dengan kamera terlebih dahulu!');
        return;
      }
      const photo = this.dataURLtoFile(this.photoDataUrl, 'camera-photo.png');
      if (!description || !photo) {
        this.view.renderError('Semua field wajib diisi!');
        return;
      }
      if (photo.size > 1024 * 1024) {
        this.view.renderError('Ukuran foto tidak boleh lebih dari 1MB!');
        return;
      }
      const formData = new FormData();
      formData.append('description', description);
      formData.append('photo', photo);
      if (lat) formData.append('lat', lat);
      if (lon) formData.append('lon', lon);
      this.view.showLoading(true);
      try {
        let res;
        const token = localStorage.getItem('token');
        if (token) {
          res = await addStory(formData, token);
        } else {
          res = await addStoryGuest(formData);
        }
        this.view.showLoading(false);
        if (!res.error) {
          alert('Cerita berhasil ditambahkan!');
          window.location.hash = '#/';
        } else {
          console.error('API Error:', res);
          this.view.renderError(res.message || 'Gagal menambah cerita');
        }
      } catch (err) {
        this.view.showLoading(false);
        this.view.renderError('Terjadi kesalahan server');
      }
    });
  }

  destroy() {
    if (this.camera) {
      this.camera.stopCamera();
    }
  }

  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]);
    let n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
} 