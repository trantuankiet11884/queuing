import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleType } from "../../interface";
import { firestore } from "../../firebase/config";


interface RoleState {
    roles: RoleType[]
}

const initialState: RoleState = {
    roles: []
}

export const fetchDataRole = createAsyncThunk('role/fetch', async () => {
    const snapshot = await firestore.collection('roles').get();
    const roles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as RoleType);
    return roles;
});

export const addRole = createAsyncThunk('role/add', async (role: RoleType) => {
    const collection = await firestore.collection('roles').add(role);
    role.id = collection.id;
    return role;
})

export const updateRole = createAsyncThunk('role/update', async (role: RoleType) => {
    const { id, ...data } = role;
    await firestore.collection('roles').doc(id).update(data);
    return role;
})

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDataRole.fulfilled, (state, action: PayloadAction<RoleType[]>) => {
            state.roles = action.payload
        })
            .addCase(addRole.fulfilled, (state, action: PayloadAction<RoleType>) => {
                state.roles.push(action.payload)
            })
            .addCase(updateRole.fulfilled, (state, action: PayloadAction<RoleType>) => {
                const updateRole = action.payload;
                const idx = state.roles.findIndex((role) => role.id === updateRole.id)
                if (idx !== -1) {
                    state.roles[idx] = updateRole;
                }
            })
    }

})

export default roleSlice.reducer;