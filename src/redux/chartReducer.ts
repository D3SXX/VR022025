
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chart{
    name: string;
    type: string;
    color: string;
    dataseries: string;
    x_axis_name: string;
    y_axis_name: string;
    text_description: string;
  }

const initialState: Chart[] = [];

const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: { 
    addChart: (state, action: PayloadAction<Chart>) => {
      state.push(action.payload);
    },
    deleteChart: (state, action: PayloadAction<string>) => {
      return state.filter(chart => chart.name !== action.payload);
    },
  },
});

export const { addChart, deleteChart } = chartSlice.actions;
export default chartSlice.reducer;