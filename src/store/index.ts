import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { api } from "./product/product";
import { api_users } from "./users/users";
import { reducer as FavoritesReducer } from "./favorites/favorites.slice";
import { reducer as UserLocStorage } from "./userLocStorage/userLocStorage.slice";
import { reducer as ProductSlice } from "./product/product.slice";
export const reducers = combineReducers({
  favorites: FavoritesReducer,
  [api.reducerPath]: api.reducer,
  [api_users.reducerPath]: api_users.reducer,
  userLocStorage:UserLocStorage,
  SearchProduct:ProductSlice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites","userLocStorage"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, api_users.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
