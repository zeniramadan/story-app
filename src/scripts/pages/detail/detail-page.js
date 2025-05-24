export default class DetailPage {
  async render() {
    return `
      <main id=\"main-content\" tabindex=\"-1\">
        <h1>Detail Cerita</h1>
        <div id=\"detail-container\"></div>
      </main>
    `;
  }

  renderDetail(story) {
    const container = document.getElementById('detail-container');
    if (!story) {
      container.innerHTML = '<p>Story tidak ditemukan.</p>';
      return;
    }
    container.innerHTML = `
      <div class=\"story-detail\">
        <img src=\"${story.photoUrl}\" alt=\"${story.description || 'Foto cerita'}\" style=\"width:100%;max-width:400px;object-fit:cover;border-radius:8px;\" />
        <h2>${story.name}</h2>
        <p>${story.description}</p>
        <p>Lat: ${story.lat}, Lng: ${story.lon}</p>
        <p>Dibuat: ${story.createdAt}</p>
      </div>
    `;
  }
} 