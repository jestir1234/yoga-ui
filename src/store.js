/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from '@app/features/user/userSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // Add any reducer keys that need to be persisted here
  whitelist: ['user'], // Example: persist the 'user' slice
};

const rootReducer = combineReducers({
  user: userReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Create a persisted store
export const persistor = persistStore(store);
