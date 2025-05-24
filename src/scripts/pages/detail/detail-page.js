export default class DetailPage {
  async render() {
    return `
      <main id=\"main-content\" tabindex=\"-1\">\n        <h1><i class=\"fa-solid fa-circle-info\" style=\"color:#6C63FF;margin-right:8px;\"></i>Detail Cerita</h1>\n        <div id=\"detail-container\"></div>\n      </main>\n    `;
  }

  renderDetail(story) {
    const container = document.getElementById('detail-container');
    if (!story) {
      container.innerHTML = '<p>Story tidak ditemukan.</p>';
      return;
    }
    container.innerHTML = `
      <div class=\"story-detail\">
        <img src=\"${story.photoUrl}\" alt=\"${story.description || 'Foto cerita'}\" style=\"width:100%;max-width:400px;object-fit:cover;border-radius:8px;box-shadow:0 2px 8px #5BC0EB22;\" />
        <h2><i class=\"fa-solid fa-user\" style=\"color:#5BC0EB;margin-right:6px;\"></i>${story.name}</h2>
        <p>${story.description}</p>
        <p><i class=\"fa-solid fa-location-dot\" style=\"color:#FFD803;margin-right:4px;\"></i>Lat: ${story.lat}, Lng: ${story.lon}</p>
        <p><i class=\"fa-solid fa-calendar-days\" style=\"color:#6C63FF;margin-right:4px;\"></i>Dibuat: ${story.createdAt}</p>
      </div>
    `;
  }
} 