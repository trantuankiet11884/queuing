import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LogEntry } from "../../interface";
import { firestore } from "../../firebase/config";

interface LogState {
    logs: LogEntry[]
}

const initialState: LogState = {
    logs: []
}

export const fetchDataLog = createAsyncThunk('log/fetch', async() => {
    const snapshot = await firestore.collection('activityLogs').get();
    const logs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}) as LogEntry);
    return logs;
})

const logSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDataLog.fulfilled, (state, action: PayloadAction<LogEntry[]>) => {
            state.logs = action.payload
        })
    }
})

export default logSlice.reducer