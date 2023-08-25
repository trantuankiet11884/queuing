import { configureStore } from '@reduxjs/toolkit'
import deviceSlice from './slice/deviceSlice'
import serviceSlice from './slice/serviceSlice'
import numberSlice from './slice/numberSlice'
import roleSlice from './slice/roleSlice'
import accountSlice from './slice/accountSlice'
import LogSlice from './slice/LogSlice'

export const store = configureStore({
    reducer: {
        devices: deviceSlice,
        services: serviceSlice,
        numbers: numberSlice,
        roles: roleSlice,
        accounts: accountSlice,
        logs: LogSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch