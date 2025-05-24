import { getStoriesWithAuth } from '../../data/api';
import HomePage from './home-page';
import { initMap } from '../../utils/map';

export default class HomePresenter {
  constructor(view) {
    this.view = view;
    this.mapInstance = null;
    this.markers = [];
  }

  async afterRender() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.view.renderStories([]);
      alert('Silakan login untuk melihat daftar cerita!');
      window.location.hash = '#/login';
      return;
    }
    this.view.showLoading(true);
    const data = await getStoriesWithAuth(token, { size: 1000 });
    this.view.renderStories(data.listStory || []);
    this._renderMap(data.listStory || []);
    this.view.bindAddStory(() => {
      window.location.hash = '#/add';
    });
    this.view.bindShowMore(() => {
      this.view.showMoreLoading(true);
      setTimeout(() => {
        this.view.renderStories(this.view.list, true);
        this._renderMap(this.view.list);
      }, 500); // simulasi loading
    });
    // Implementasi peta akan ditambahkan di sini
  }

  _renderMap(stories) {
    // Tampilkan loading spinner peta
    const mapLoading = document.getElementById('map-loading');
    if (mapLoading) mapLoading.style.display = 'block';
    // Hapus peta lama jika ada
    if (this.mapInstance && this.mapInstance.map) {
      this.mapInstance.map.remove();
    }
    // Default ke Jakarta jika tidak ada story
    let lat = -6.2, lon = 106.8, zoom = 10;
    if (stories.length > 0) {
      lat = stories[0].lat || lat;
      lon = stories[0].lon || lon;
      zoom = 15;
    }
    this.mapInstance = initMap({
      id: 'home-map',
      lat,
      lon,
      zoom,
      marker: false,
    });
    // Tambahkan marker untuk setiap story
    this.markers = [];
    const group = [];
    stories.forEach(story => {
      if (story.lat && story.lon) {
        const marker = window.L.marker([story.lat, story.lon]).addTo(this.mapInstance.map);
        marker.bindPopup(`<b>${story.name}</b><br>${story.description || ''}`);
        this.markers.push(marker);
        group.push([story.lat, story.lon]);
      }
    });
    // Auto-fit ke semua marker
    if (group.length > 0) {
      this.mapInstance.map.fitBounds(group, { padding: [40, 40] });
    }
    // Sembunyikan loading spinner peta
    if (mapLoading) mapLoading.style.display = 'none';
  }
} 