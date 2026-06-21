document.addEventListener('DOMContentLoaded', async () => {
  const detailContainer = document.getElementById('detail-container');
  const urlParams = new URLSearchParams(window.location.search);
  const showId = urlParams.get('id');

  if (!showId) {
    detailContainer.innerHTML = '<p class="error-text">No se especificó un ID de serie válido.</p>';
    return;
  }

  try {
    const show = await getShowDetails(showId);
    renderShowDetails(show);
  } catch (error) {
    detailContainer.innerHTML = '<p class="error-text">Error al cargar la información detallada de la serie.</p>';
  }

  function renderShowDetails(show) {
    const imageSrc = show.image ? show.image.original : 'https://via.placeholder.com/350x500?text=Sin+Imagen';
    const genres = show.genres && show.genres.length > 0 ? show.genres.join(', ') : 'No especificado';
    const rating = show.rating.average ? `⭐ ${show.rating.average} / 10` : 'Sin calificación';
    
    const summary = show.summary ? show.summary : '<p>No hay sinopsis disponible.</p>';

    detailContainer.innerHTML = `
      <div class="detail-layout">
        <div class="detail-img-box">
          <img src="${imageSrc}" alt="${show.name}">
        </div>
        <div class="detail-info-box">
          <h2>${show.name}</h2>
          <div class="meta-info">
            <p><strong>Géneros:</strong> ${genres}</p>
            <p><strong>Calificación:</strong> ${rating}</p>
            <p><strong>Idioma:</strong> ${show.language || 'No disponible'}</p>
            <p><strong>Estreno:</strong> ${show.premiered || 'No registrada'}</p>
          </div>
          <div class="summary-content">
            <h3>Sinopsis</h3>
            ${summary}
          </div>
        </div>
      </div>
    `;
  }
});