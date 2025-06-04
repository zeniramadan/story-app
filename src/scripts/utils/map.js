import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function initMap({
  id = 'map',
  lat = -6.2,
  lon = 106.8,
  zoom = 5,
  onClick = null,
  marker = true,
  popupText = '',
  onMarkerUpdate = null,
}) {
  const map = L.map(id).setView([lat, lon], zoom);

  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  });
  const maptiler = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=TMuH5nPwlbb1KKGbZqIj', {
    attribution: '© MapTiler',
  });

  osm.addTo(map);

  const baseLayers = {
    'OpenStreetMap': osm,
    'MapTiler Streets': maptiler,
  };
  L.control.layers(baseLayers).addTo(map);

  let mapMarker = null;
  if (marker) {
    mapMarker = L.marker([lat, lon]).addTo(map);
    if (popupText) {
      mapMarker.bindPopup(popupText).openPopup();
    }
    if (onMarkerUpdate) onMarkerUpdate(mapMarker);
  }

  if (onClick) {
    map.on('click', async function (e) {
      if (mapMarker) map.removeLayer(mapMarker);
      mapMarker = L.marker(e.latlng).addTo(map);
      if (onMarkerUpdate) onMarkerUpdate(mapMarker);
      // Tunggu nama lokasi dari handler
      const name = await onClick(e.latlng);
      if (name) {
        mapMarker.bindPopup(name).openPopup();
      }
    });
  }

  return { map, marker: mapMarker };
} 