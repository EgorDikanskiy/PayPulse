import { createSlice } from '@reduxjs/toolkit';
import { submitVacancy } from '../actions/vacancyActions';

interface VacancyState {
  loading: boolean;
  error: string | null;
  success: boolean;
  vacancyData: any | null;
}

const initialState: VacancyState = {
  loading: false,
  error: null,
  success: false,
  vacancyData: null,
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    resetVacancyState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.vacancyData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitVacancy.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.vacancyData = null;
      })
      .addCase(submitVacancy.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.vacancyData = action.payload;
      })
      .addCase(submitVacancy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.vacancyData = null;
      });
  },
});

export const { resetVacancyState } = vacancySlice.actions;
export default vacancySlice.reducer;
