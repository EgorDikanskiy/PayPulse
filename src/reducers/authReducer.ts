import { createSlice } from '@reduxjs/toolkit';
import { login, getCurrentUser, resetError } from '../actions/authActions';

interface User {
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Получаем начальное состояние из localStorage
const getInitialState = (): AuthState => {
  const accessToken = localStorage.getItem('access_token');
  const savedUser = localStorage.getItem('user');
  return {
    accessToken,
    user: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Логин пользователя
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.user = action.payload.user;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Получение пользователя
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Не очищаем пользователя при ошибке получения данных
      })

      .addCase(resetError, (state) => {
        state.error = null;
      });
  },
});

export const { logout, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
