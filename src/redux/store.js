// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userReducer from "./userSlice";
import authReducer from "./authSlice";

// 🔹 Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

// 🔹 Persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "user"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// 🔹 Persistor
const persistor = persistStore(store);

export { store, persistor };
