import jwtDecode from "jwt-decode";
import api from "../../api";
import { setToken, setUserData, updateUserData } from "./index";

const userThunk = {
  userLogin(credentials) {
    return async (dispatch) => {
      const [res, data] = await api.auth.login(credentials);
      if (res.status === 200) {
        dispatch(setUserData(data));
        dispatch(setToken({ access: data.token }));
      }
      return [res, data];
    };
  },
  userLogout() {
    return async (dispatch) => {
      dispatch(setUserData({}));
      dispatch(setToken({}));
      localStorage.removeItem("survey-access-token");
    };
  },

  checkToken() {
    return async (dispatch) => {
      const accessToken = localStorage.getItem("survey-access-token");
      if (!accessToken) return;
      const payload = jwtDecode(accessToken);
      if (!payload) return;
      if (payload["iat"]) delete payload["iat"];
      dispatch(setUserData(payload));
      dispatch(
        setToken({
          access: accessToken,
        })
      );
    };
  },

  getUserData() {
    return async (dispatch) => {
      const [res, data] = await api.auth.viewProfile();
      if (res.status === 200) {
        dispatch(setUserData(data));
      }
      return [res, data];
    };
  },

  updateUserProfile(profile) {
    return async (dispatch) => {
      const [res, data] = await api.auth.editProfile(profile);
      if (res.status === 200) {
        dispatch(updateUserData(profile));
      }
      return [res, data];
    };
  }

 
};

export default userThunk;
