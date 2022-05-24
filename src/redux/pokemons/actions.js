export const GET_POKEMONS = '[APP] GET POKEMONS';
export const CHANGE_FILTER = '[APP] CHANGE FILTER';

export function GetAllPokemons(data) {
  return {
        type: GET_POKEMONS,
          payload: data
    }
}

export function changeFilter(value) {
  return {
    type: CHANGE_FILTER,
     payload: value
  };
} 