import { configureStore } from "@reduxjs/toolkit";


/**
 * User related
 */
import userReducer, * as userActions from "./user";
import userThunk from "./user/thunk";
import * as userSelectors from "./user/select";

/**
 * UI related
 */
import uiReducer, {
  setSidebarShow,
  selectUnfoldable,
  selectSidebarShow,
  setUnfoldable,
} from "./ui";

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer
  },
});

export default store;

export const actions = {
  user: userActions,
  ui: uiReducer
};

export const thunks = {
  user: userThunk,
  ui: {setSidebarShow, setUnfoldable}
};

export const selectors = {
  user: userSelectors,
  ui: {selectUnfoldable, selectSidebarShow, setUnfoldable}
};

export function accessToken() {
  const accessToken = store.getState().user.tokens.access;
  return accessToken;
}

