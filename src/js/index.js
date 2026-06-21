document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const resultsGrid = document.getElementById('results-grid');
  const sectionTitle = document.getElementById('section-title');
  initHome();

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    resultsGrid.innerHTML = '<p class="loading-text">Buscando...</p>';
    sectionTitle.textContent = `Resultados para: "${query}"`;

    try {
      const results = await searchShows(query);
      renderResults(results);
    } catch (error) {
      resultsGrid.innerHTML = '<p class="error-text">Hubo un error al realizar la búsqueda. Inténtalo de nuevo.</p>';
    }
  });

  async function initHome() {
    try {
      const defaultShows = await searchShows('star');
      renderResults(defaultShows);
    } catch (error) {
      resultsGrid.innerHTML = '<p class="error-text">No se pudieron cargar las sugerencias.</p>';
    }
  }

  function renderResults(showsArray) {
    resultsGrid.innerHTML = '';

    if (showsArray.length === 0) {
      resultsGrid.innerHTML = '<p class="info-text">No se encontraron series con ese nombre.</p>';
      return;
    }

    showsArray.forEach(item => {
      const show = item.show;
      const imageSrc = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=Sin+Imagen';
      const rating = show.rating.average ? `⭐ ${show.rating.average}` : '⭐ Sin rating';

      const card = document.createElement('article');
      card.className = 'show-key-card';
      card.innerHTML = `
        <img src="${imageSrc}" alt="${show.name}" class="card-img">
        <div class="card-body">
          <h3 class="card-title">${show.name}</h3>
          <p class="card-rating">${rating}</p>
          <a href="show-detail.html?id=${show.id}" class="btn btn-card">Ver Detalles</a>
        </div>
      `;
      resultsGrid.appendChild(card);
    });
  }
});