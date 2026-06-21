const api = axios.create({
  baseURL: 'https://api.tvmaze.com'
});

async function searchShows(query) {
  try {
    const response = await api.get(`/search/shows?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar las series:', error);
    throw error;
  }
}
async function getShowDetails(id) {
  try {
    const response = await api.get(`/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener detalles del ID ${id}:`, error);
    throw error;
  }
}