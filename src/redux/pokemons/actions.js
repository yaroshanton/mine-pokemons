export const GET_POKEMONS = '[APP] GET POKEMONS';

export function GetAllPokemons(data) {
  return {
        type: GET_POKEMONS,
        data
    }
}
