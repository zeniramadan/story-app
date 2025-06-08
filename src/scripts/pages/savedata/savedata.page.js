import SavedataPresenter from './savedata.presenter.js';

const SavedataPage = {
  async render() {
    return `
      <main id="main-content" tabindex="-1">
        <h1 class="home-title"><i class="fa-solid fa-floppy-disk" style="color:#FFD803;margin-right:8px;"></i>Data Cerita Tersimpan</h1>
        <section id="savedata-section">
          <div id="savedata-loading" class="loading" style="display:none;text-align:center;margin:32px 0;">
            <span class="loading-spinner"></span> Memuat data...
          </div>
          <section id="savedata-grid" class="story-grid" aria-label="Daftar Cerita Tersimpan"></section>
        </section>
      </main>
    `;
  },
  async afterRender() {
    const view = {
      showStories(stories) {
        const grid = document.getElementById('savedata-grid');
        grid.innerHTML = '';
        if (!stories.length) {
          grid.innerHTML = '<div style="text-align:center;color:#888;">Tidak ada data tersimpan.</div>';
          return;
        }
        const maxDesc = 120;
        const items = stories.map(story => {
          let desc = story.description || story.content || '';
          if (desc.length > maxDesc) desc = desc.slice(0, maxDesc) + '...';
          return `
            <article class="story-card" data-id="${story.id}">
              ${story.photoUrl ? `<img src="${story.photoUrl}" alt="Foto cerita" loading="lazy" />` : ''}
              <h2><i class="fa-solid fa-user" style="color:#5BC0EB;margin-right:6px;"></i>${story.name || story.title || '-'}</h2>
              <p>${desc}</p>
              ${story.lat && story.lon ? `<p><i class=\"fa-solid fa-location-dot\" style=\"color:#FFD803;margin-right:4px;\"></i>Lat: ${story.lat}, Lng: ${story.lon}</p>` : ''}
              <button data-id="${story.id}" class="delete-btn" style="margin-top:8px;background:#FFD803;color:#222;border:none;border-radius:6px;padding:6px 12px;cursor:pointer;font-weight:bold;"><i class="fa-solid fa-trash"></i> Hapus</button>
            </article>
          `;
        }).join('');
        grid.innerHTML = items;
        // Card click to detail
        grid.querySelectorAll('.story-card').forEach(card => {
          card.onclick = (e) => {
            if (e.target.classList.contains('delete-btn')) return;
            const id = card.getAttribute('data-id');
            if (id) window.location.hash = `#/detail/${id}`;
          };
        });
      }
    };

    const presenter = SavedataPresenter(view);
    presenter.loadStories();

    document.getElementById('savedata-grid').addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        await presenter.deleteStory(id);
      }
    });
  }
};

export default SavedataPage;
