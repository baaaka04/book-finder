import { configureStore } from "@reduxjs/toolkit";
import bookerReducer from './reducer'
import categoryReducer from './categoryReducer'
import sortingReducer from './sortingReducer'

export const store = configureStore({
    reducer: {
        book: bookerReducer,
        category: categoryReducer,
        sorting: sortingReducer,
    },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>