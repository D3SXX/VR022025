import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './chartReducer';
import dataReducer from './dataReducer';

const store = configureStore({
  reducer: {
    charts: chartReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;