import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "../slices/authSlice";
import { apiSlice } from "../slices/apiSlice";
import { persistStore, persistReducer, PersistConfig, createTransform, Transform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { AES } from "crypto-js";
import { enc } from "crypto-js";

const encryptTransform: Transform<AuthState, any> = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        const state = JSON.stringify(inboundState);
        const encryptedState = AES.encrypt(state, import.meta.env.VITE_SECRET_KEY).toString();
        return encryptedState;
    },
    // transform state being rehydrated
    (outboundState, key) => {
        const decryptedState = AES.decrypt(outboundState, import.meta.env.VITE_SECRET_KEY);
        const state = JSON.parse(decryptedState.toString(enc.Utf8));
        return state;
    }
);

const persistConfig = {
    key: 'RSS Aggregator',
    storage,
    transforms: [encryptTransform]
};

const persistedReducer = persistReducer(persistConfig as any, authSlice);
const combinedReducers = combineReducers({
    auth: persistedReducer,
    api: apiSlice.reducer
});
export const store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }).concat(apiSlice.middleware),
    devTools: true
})

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
