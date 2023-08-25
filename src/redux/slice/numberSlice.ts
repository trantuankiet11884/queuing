import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberType } from "../../interface";
import { firestore } from "../../firebase/config";


interface NumberState {
    numbers: NumberType[]
}

const initialState: NumberState = {
    numbers: []
}

export const fetchDataNumber = createAsyncThunk('number/fetch', async () => {
    const snapshot = await firestore.collection('numbers').get();
    const number = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as NumberType);
    return number;
})

export const addNumber = createAsyncThunk('number/add', async (number: NumberType) => {
    const collection = await firestore.collection('numbers').add(number);
    number.id = collection.id;
    return number;
})

const numberSlice = createSlice({
    name: 'numbers',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDataNumber.fulfilled, (state, action: PayloadAction<NumberType[]>) => {
            state.numbers = action.payload
        })
            .addCase(addNumber.fulfilled, (state, action: PayloadAction<NumberType>) => {
                state.numbers.push(action.payload)
            })
    }
})

export default numberSlice.reducer