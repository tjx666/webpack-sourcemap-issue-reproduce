import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 2,
};

const slice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.count++;
        },
    },
});

export const { increment } = slice.actions;

export default slice.reducer;
