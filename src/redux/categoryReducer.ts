import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    value: string,
}

const initialState: CategoryState = {
    value: 'all',
}

const categorySlice = createSlice({
    name: 'categorySelect',
    initialState,
    reducers: {
        changed(state, action: PayloadAction<string>) {
            state.value = action.payload
        }
    }
})

export const { changed } = categorySlice.actions;
export default categorySlice.reducer