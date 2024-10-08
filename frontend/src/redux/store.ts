
import authSlice from "./slices/userSlice.ts";
import sessionSlice from "./slices/sessionSlice.ts";
import serviceProvider from "./slices/sessionProviderSlice.ts"
import AssignedServices from "./slices/serviceProviderSessions.ts"
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist:['session','assignedServices']
  }

  const rootReducer = combineReducers({
        auth:authSlice,
        session:sessionSlice,
        serviceProvider:serviceProvider,
        assignedServices:AssignedServices
  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
export type RootState = ReturnType<typeof rootReducer>;
export default store;
