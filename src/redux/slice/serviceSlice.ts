import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceType } from "../../interface";
import { firestore } from "../../firebase/config";


interface ServiceState {
    services: ServiceType[]
}

const initialState: ServiceState = {
    services: []
}

export const fetchData = createAsyncThunk('service/fetch', async () => {
    const snapshot = await firestore.collection('services').get();
    const services = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ServiceType)
    return services;
});

export const addService = createAsyncThunk('service/add', async (service: ServiceType) => {
    try {
        const collection = await firestore.collection('services').add(service);
        service.id = collection.id;
        return service;
    } catch (err) {
        console.log(err);
        throw err;

    }
})

export const updateService = createAsyncThunk('service/update', async (service: ServiceType) => {
    const { id, ...data } = service;
    try {
        if (!id) {
            throw new Error('Service ID is missing !')
        }
        await firestore.collection('services').doc(id).update(data);
        return service;
    } catch (err) {
        console.log(err);
        throw err;

    }
})

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<ServiceType[]>) => {
            state.services = action.payload
        })
            .addCase(addService.fulfilled, (state, action: PayloadAction<ServiceType>) => {
                state.services.push(action.payload)
            })
            .addCase(updateService.fulfilled, (state, action: PayloadAction<ServiceType>) => {
                const updateService = action.payload;
                const idx = state.services.findIndex((service) => service.id === updateService.id)
                if(idx !== -1) {
                    state.services[idx] = updateService;
                }
            })
    }
})

export default serviceSlice.reducer