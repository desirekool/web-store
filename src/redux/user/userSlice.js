import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter', 
  dracula: 'dracula'	
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loginUser(state, action) {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    toggleTheme(state) {
      const { winter, dracula } = themes;
      const theme = getThemeFromLocalStorage();      
      state.theme = state.theme === winter ? dracula : winter;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', JSON.stringify(state.theme));    
    },
  }
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;