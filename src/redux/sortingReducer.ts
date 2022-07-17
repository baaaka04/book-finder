import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortingState {
    value: string,
}

const initialState: SortingState = {
    value: 'relevance',
}

const sortingSlice = createSlice({
    name: 'categorySelect',
    initialState,
    reducers: {
        sorted(state, action: PayloadAction<string>) {
            state.value = action.payload
        }
    }
})

export const { sorted } = sortingSlice.actions;
export default sortingSlice.reducer