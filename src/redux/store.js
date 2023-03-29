import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

export const reduxStorage = {
  setItem: async (key, value) => {
    await localStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  getItem: async (key) => {
    const value = await localStorage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: async (key) => {
    await localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["flightReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistedStore = persistStore(store);
export const persistor = persistStore(store);
