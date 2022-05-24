import * as Action from '../pokemons/actions';

const initialState = []

export function pokemons(state = initialState, action) {
  switch (action.type) {
    case Action.GET_POKEMONS: {
     return [...state, ...action.payload]
    }
    default: {
      return state;
    }
  }
}

export function filter(state = '', action) {
    switch (action.type) {
        case Action.CHANGE_FILTER:
            return action.payload;

        default:
            return state;
    }
}