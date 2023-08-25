import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Device } from "../../interface";
import { firestore } from '../../firebase/config';

interface DeviceState {
  devices: Device[];
}

const initialState: DeviceState = {
  devices: []
}

export const fetchData = createAsyncThunk('device/fetch', async () => {
  const snapshot = await firestore.collection('devices').get();
  const devices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Device))
  return devices;
})

export const addDevice = createAsyncThunk('device/add', async (device: Device) => {
  try {
    const collection = await firestore.collection('devices').add(device);
    device.id = collection.id;
    return device;
  } catch (err) {
    throw new Error('Failed to add device to Firestore!')
  }
})

export const updateDevice = createAsyncThunk(
  'device/update',
  async (device: Device) => {
    const { id, ...data } = device;
    console.log('Update device:', device); // Log the device being updated
    try {
      if (!id) {
        throw new Error('Device ID is missing! Unable to update.');
      }
      await firestore.collection('devices').doc(id).update(data);
      return device;
    } catch (err) {
      console.error('Error updating device:', err);
      throw err;
    }
  }
);

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload
    })
      .addCase(addDevice.fulfilled, (state, action: PayloadAction<Device>) => {
        state.devices.push(action.payload)
      })
      .addCase(updateDevice.fulfilled, (state, action: PayloadAction<Device>) => {
        const updatedDevice = action.payload;
        const idx = state.devices.findIndex((device) => device.id === updatedDevice.id)
        if (idx !== -1) {
          state.devices[idx] = updatedDevice;
        }
      })
  }
})

export default deviceSlice.reducer;
