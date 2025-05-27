import AddModel from './add-model';
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
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.camera = null;
    this.photoDataUrl = null;
    this.mapInstance = null;
    this.currentMarker = null;
  }

  async afterRender() {
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
        this.view.setLatLon(lat, lon);
        popupText = await getLocationName(lat, lon);
      } catch (e) {
        popupText = await getLocationName(lat, lon);
      }
    } else {
      popupText = await getLocationName(lat, lon);
    }

    this.mapInstance = initMap({
      id: 'map',
      lat,
      lon,
      zoom: 13,
      onClick: async (latlng) => {
        this.view.setLatLon(latlng.lat, latlng.lng);
        const name = await getLocationName(latlng.lat, latlng.lng);
        this.view.setMapPopup(name);
      },
      marker: true,
      popupText,
      onMarkerUpdate: (marker) => {
        this.currentMarker = marker;
        window.currentAddMarker = marker;
      },
    });

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
        const res = await this.model.submitStory(formData);
        console.log('RESPONSE DARI API:', res);
        this.view.showLoading(false);
        if (!res.error) {
          this.view.showAlert('Cerita berhasil ditambahkan!');
          this.view.redirectToHome();
        } else {
          this.view.renderError(res.message || 'Gagal menambah cerita');
        }
      } catch (err) {
        this.view.showLoading(false);
        console.error('ERROR SAAT SUBMIT:', err);
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