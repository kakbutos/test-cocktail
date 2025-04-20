import { configureStore } from '@reduxjs/toolkit';
import drinkDetailsReducer from '../../features/drink-details/model/slice/drinkDetailsSlice';
import drinkListReducer from '../../features/drink-list/model/slice/drinkListSlice';

export const store = configureStore({
  reducer: {
    drinkDetails: drinkDetailsReducer,
    drinkList: drinkListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
