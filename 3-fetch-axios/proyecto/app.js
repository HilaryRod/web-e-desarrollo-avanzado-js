const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');

// Función para ajustar los Pokémon
function renderPokemons(pokemons) {
  dataContainer.innerHTML = '';
  pokemons.forEach(pokemon => {
    const div = document.createElement('div');
    div.className = 'pokemon-card';
    div.innerHTML = `
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.image}" alt="${pokemon.name}">
    `;
    dataContainer.appendChild(div);
  });
}

//  Usando Fetch
fetchBtn.addEventListener('click', () => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener los Pokémon');
      return res.json();
    })
    .then(data => {
      const promises = data.results.map(pokemon =>
        fetch(pokemon.url)
          .then(res => res.json())
          .then(details => ({
            name: details.name,
            image: details.sprites.front_default
          }))
      );
      return Promise.all(promises);
    })
    .then(pokemonList => {
      renderPokemons(pokemonList);
    })
    .catch(error => {
      console.error(error);
      dataContainer.textContent = 'Hubo un error al cargar los Pokémon con Fetch.';
    });
});

//  Usando Axios
axiosBtn.addEventListener('click', () => {
  axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(res => {
      const results = res.data.results;
      const promises = results.map(pokemon =>
        axios.get(pokemon.url)
          .then(details => ({
            name: details.data.name,
            image: details.data.sprites.front_default
          }))
      );
      return Promise.all(promises);
    })
    .then(pokemonList => {
      renderPokemons(pokemonList);
    })
    .catch(error => {
      console.error(error);
      dataContainer.textContent = 'Hubo un error al cargar los Pokémon con Axios.';
    });
});
