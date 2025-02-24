
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
    data: Entry[]
  }
  
  interface Entry {
    name: string;
    dataseries: Datasery[];
  }
  
  interface Datasery {
    value: number;
    date: string;
  }
  
const initialState: Data = { data: [] };

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Data>) => {
      state.data = action.payload.data;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;