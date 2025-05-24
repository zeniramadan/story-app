import 'leaflet/dist/leaflet.css';

export default class HomePage {
  constructor() {
    this.list = [];
    this.renderedCount = 0;
    this.pageSize = 20;
  }

  async render() {
    return `
      <main id=\"main-content\" tabindex=\"-1\">
        <div id=\"home-map\" style=\"height:350px;margin-bottom:24px;margin-top:0;padding-top:0;border-bottom-left-radius:12px;border-bottom-right-radius:12px;overflow:hidden;background:#eee;\"><span id=\"map-loading\" class=\"loading-spinner\" style=\"display:block;margin:120px auto;\"></span></div>
        <h1 class=\"home-title\"><i class=\"fa-solid fa-book-open\" style=\"color:#6C63FF;margin-right:8px;\"></i>Daftar Cerita</h1>
        <button id=\"add-story-btn\"><i class=\"fa-solid fa-plus\" style=\"margin-right:6px;\"></i>Tambah Cerita</button>
        <div id=\"home-loading\" class=\"loading\" style=\"display:none;text-align:center;margin:32px 0;\">
          <span class=\"loading-spinner\"></span> Memuat data...
        </div>
        <section id=\"story-grid\" class=\"story-grid\" aria-label=\"Daftar Cerita\"></section>
        <div id=\"more-loading\" class=\"loading\" style=\"display:none;text-align:center;margin:16px 0;\">
          <span class=\"loading-spinner\"></span> Memuat lebih banyak...
        </div>
        <button id=\"show-more-btn\" style=\"display:none;margin:24px auto;display:block;\"><i class=\"fa-solid fa-angles-down\" style=\"margin-right:6px;\"></i>Tampilkan lebih banyak</button>
      </main>
    `;
  }

  showLoading(isLoading) {
    const loading = document.getElementById('home-loading');
    if (loading) loading.style.display = isLoading ? '' : 'none';
  }

  showMoreLoading(isLoading) {
    const loading = document.getElementById('more-loading');
    if (loading) loading.style.display = isLoading ? '' : 'none';
  }

  renderStories(list, append = false) {
    this.showLoading(false);
    this.showMoreLoading(false);
    if (!append) {
      this.list = list;
      this.renderedCount = 0;
      document.getElementById('story-grid').innerHTML = '';
    }
    const grid = document.getElementById('story-grid');
    if (!grid) {
      console.error('story-grid element not found!');
      return;
    }
    const maxDesc = 120;
    const start = this.renderedCount;
    const end = Math.min(this.renderedCount + this.pageSize, this.list.length);
    const items = this.list.slice(start, end).map(story => {
      let desc = story.description || '';
      if (desc.length > maxDesc) desc = desc.slice(0, maxDesc) + '...';
      return `
      <article class=\"story-card\" data-id=\"${story.id}\">
        <img src=\"${story.photoUrl}\" alt=\"Foto cerita: ${story.description ? story.description.replace(/\"/g, '') : 'tanpa deskripsi'}\" loading=\"lazy\" />
        <h2><i class=\"fa-solid fa-user\" style=\"color:#5BC0EB;margin-right:6px;\"></i>${story.name}</h2>
        <p>${desc}</p>
        <p><i class=\"fa-solid fa-location-dot\" style=\"color:#FFD803;margin-right:4px;\"></i>Lat: ${story.lat}, Lng: ${story.lon}</p>
      </article>
      `;
    }).join('');
    grid.insertAdjacentHTML(append ? 'beforeend' : 'afterbegin', items);
    this.renderedCount = end;
    grid.querySelectorAll('.story-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-id');
        window.location.hash = `#/detail/${id}`;
      };
    });
    // Tampilkan tombol more jika masih ada sisa
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
      showMoreBtn.style.display = this.renderedCount < this.list.length ? '' : 'none';
    }
  }

  bindAddStory(handler) {
    document.getElementById('add-story-btn').onclick = handler;
  }

  bindShowMore(handler) {
    const btn = document.getElementById('show-more-btn');
    if (btn) btn.onclick = handler;
  }
}
