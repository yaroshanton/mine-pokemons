import axios from 'axios'

const fetchPokemons = (more) => {
    return axios
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${more}`)
        .then(res => res.data);
};

const fetchPokemon = (query) => {
  return axios
      .get(`${query}`)
      .then(res => res.data);
};

export default { fetchPokemons, fetchPokemon };
