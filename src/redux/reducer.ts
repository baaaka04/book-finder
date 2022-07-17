import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookState {
    value: string,
}

const initialState: BookState = {
    value: '',
}

const bookerSlice = createSlice({
    name: 'bookInput',
    initialState,
    reducers: {
        written(state, action: PayloadAction<string>) {
            state.value = action.payload
        }
    }
})

export const { written } = bookerSlice.actions;
export default bookerSlice.reducer