import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Drink } from '../../../../entities/drink/model/types/drink';
import { getDrinkList } from '../../api/drinkListApi';
import { CocktailCode, DEFAULT_COCKTAIL } from '../../../../shared/config/cocktails';

interface DrinkListState {
  data: Record<CocktailCode, Drink[]>;
  isLoading: boolean;
  error: string | null;
  currentCocktail: CocktailCode;
}

const initialState: DrinkListState = {
  data: {} as Record<CocktailCode, Drink[]>,
  isLoading: false,
  error: null,
  currentCocktail: DEFAULT_COCKTAIL,
};

export const fetchDrinkList = createAsyncThunk<
  Drink[],
  CocktailCode,
  { state: { drinkList: DrinkListState } }
>('drinkList/fetchDrinkList', async (cocktailCode, { rejectWithValue, getState }) => {
  try {
    const { drinkList } = getState();
    if (drinkList.data[cocktailCode] && drinkList.data[cocktailCode].length > 0) {
      return drinkList.data[cocktailCode];
    }

    return await getDrinkList(cocktailCode);
  } catch (_error) {
    console.error('Error fetching data for:', cocktailCode, _error);
    return rejectWithValue('Ошибка при получении списка напитков');
  }
});

const drinkListSlice = createSlice({
  name: 'drinkList',
  initialState,
  reducers: {
    setCurrentCocktail: (state, action: PayloadAction<CocktailCode>) => {
      state.currentCocktail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinkList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDrinkList.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.length > 0) {
          state.data[state.currentCocktail] = action.payload;
        }
      })
      .addCase(fetchDrinkList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentCocktail } = drinkListSlice.actions;
export default drinkListSlice.reducer;
