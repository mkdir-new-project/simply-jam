import { configureStore, createReducer } from '@reduxjs/toolkit';

const store = configureStore({
    preloadedState: {
        'USERNAME': null
    },
    reducer: createReducer({ USERNAME: null }, (a) => null)
})
