import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Drink } from '../../../../entities/drink/model/types/drink';
import { getDrinkDetails } from '../../api/drinkDetailsApi';

interface DrinkDetailsState {
  data: Drink | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DrinkDetailsState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchDrinkDetails = createAsyncThunk<Drink, string>(
  'drinkDetails/fetchDrinkDetails',
  async (id, { rejectWithValue }) => {
    try {
      return await getDrinkDetails(id);
    } catch {
      return rejectWithValue('Ошибка при получении данных о напитке');
    }
  }
);

const drinkDetailsSlice = createSlice({
  name: 'drinkDetails',
  initialState,
  reducers: {
    clearDrinkDetails: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinkDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDrinkDetails.fulfilled, (state, action: PayloadAction<Drink>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDrinkDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDrinkDetails } = drinkDetailsSlice.actions;
export default drinkDetailsSlice.reducer;
