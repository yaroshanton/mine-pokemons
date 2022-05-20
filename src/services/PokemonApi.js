import axios from 'axios'

const fetchPokemons = () => {
    return axios
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0`)
        .then(res => res.data);
};

const fetchPokemon = (query) => {
  return axios
      .get(`${query}`)
      .then(res => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchPokemons, fetchPokemon };
