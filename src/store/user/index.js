import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    userId: "",
    name: "",
    email: "",
    telephone: "",
    accountType: "",
    role: "",
  },
  tokens: {
    access: "",
  }
};

/**
 * User slice
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.tokens = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = {...state.userData, ...action.payload};
    },
  },
});

export const { setUserData, setToken, updateUserData } = userSlice.actions;
export default userSlice.reducer;

