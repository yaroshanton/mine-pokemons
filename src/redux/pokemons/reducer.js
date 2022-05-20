import * as Action from '../pokemons/actions';

const initialState = {
  pokemons: [],
};

function pokemonsReducer(state = initialState, action) {
  switch (action.type) {
    case Action.GET_POKEMONS: {
      return {
        // [...state, action.data]
      };
    }
    default: {
      return state;
    }
  };
};
console.log(initialState, 'initialState');

export default pokemonsReducer;