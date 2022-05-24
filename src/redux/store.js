import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {pokemons , filter} from './pokemons/reducer';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const store = configureStore({
  reducer: {
    pokemons,
    filter
  },
  middleware,
});

export default store;