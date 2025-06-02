import AddModel from './add-model';
import AddPage from './add-page';

export default class AddPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.photoDataUrl = null;
  }

  async afterRender() {
    let lat = -6.2;
    let lon = 106.8;
    let popupText = 'Lokasi Anda';

    const location = await this.model.getCurrentLocation();
    if (location) {
      lat = location.lat;
      lon = location.lon;
      this.view.setLatLon(lat, lon);
      popupText = await this.model.getLocationName(lat, lon);
    } else {
      popupText = await this.model.getLocationName(lat, lon);
    }

    this.view.initMapView({
      lat,
      lon,
      popupText,
      getLocationName: this.model.getLocationName.bind(this.model),
      setLatLon: (lat, lon) => this.view.setLatLon(lat, lon),
      setMapPopup: (name) => this.view.setMapPopup(name),
      setCurrentMarker: (marker) => { this.currentMarker = marker; }
    });
    this.view.initCameraView({
      onPhotoCaptured: (photoDataUrl) => { this.photoDataUrl = photoDataUrl; },
      showCameraUI: (show) => this.view.showCameraUI(show),
      showPhotoPreview: (dataUrl) => this.view.showPhotoPreview(dataUrl)
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
    if (this.view.camera) {
      this.view.camera.stopCamera();
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