import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import {thunk} from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only 'auth' slice will be persisted
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
  
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
      serializableCheck: false, // Ignore check for non-serializable values
    }).concat(logger), // Add logger middleware
});

const persistor = persistStore(store);

export { store, persistor };
