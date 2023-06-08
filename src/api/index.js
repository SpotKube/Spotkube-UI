import axios from "axios";
import { thunks } from "../store";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

/**
 * Setup Axios
 */
const BASE_URL_REMOTE = process.env.REACT_APP_BASE_URL_REMOTE;
const FILE_URL_REMOTE = process.env.REACT_APP_FILE_URL_REMOTE;

const DEFAULT_BASE_URL = BASE_URL_REMOTE;
const DEFAULT_FILE_URL = FILE_URL_REMOTE;

export const BACK_END_URL = {
  DEFAULT_BASE_URL,
  DEFAULT_FILE_URL,
};

axios.defaults.baseURL = DEFAULT_BASE_URL;

/**
 * Register Access token with axios
 * @param token
 */
// Register access token with axios
export const registerAccessToken = (token, history, dispatch) => {
  if (token) {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      toast.error("Your session has expired, please login again", {});
      toast.success("You will be redirect to Login page", { delay: 300 });
      dispatch(thunks.user.userLogout());
      setTimeout(() => {
        history.replace("/login");
        return;
      }, 2000);
      return false;
    }
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    return true;
  } else {
    toast.error("Your session has expired, please login again");
    toast.success("You will be redirect to Login page", { delay: 300 });
    dispatch(thunks.user.userLogout());
    setTimeout(() => {
      history.replace("/login");
      return;
    }, 2000);
    return false;
  }
};

/**
 * Convert Axios Response into
 *      status: http status code
 *      message: message from backend api
 * @param res
 */
function readStatus(res) {
  if (!res || !res.status) {
    return {
      status: 408,
      message: "Alternative selected more than once",
    };
  }
  return {
    status: res.status,
    message: res.data.message,
    token: res.data.token,
  };
}

/**
 * Resolve Axios Response
 * @param axiosRes
 * @param options
 */
async function ajaxResolver(axiosRes, options = null) {
  try {
    const res = await axiosRes;
    if (options && options.fullBody) return [readStatus(res), res.data];
    else return [readStatus(res), res.data.data];
  } catch (e) {
    const res = e.response;
    return [readStatus(res), null];
  }
}

/**
 * Form data config to send images
 */
// eslint-disable-next-line no-unused-vars
const formDataConfig = {
  headers: { "content-type": "multipart/form-data" },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth: {
    async login(credentials) {
      return ajaxResolver(
        axios.post("/auth/login", {
          username: credentials.username,
          password: credentials.password,
        })
      );
    },
    async register(data) {
      return ajaxResolver(axios.post("/admin/signup", data));
    },
    async viewProfile() {
      return ajaxResolver(axios.get("/auth/view-profile"));
    },
    async editProfile(data) {
      return ajaxResolver(axios.put("/auth/edit-profile", data));
    },
    async changePassword(data) {
      return ajaxResolver(axios.post("/auth/change-password", data));
    },
    // get: {
    //     async designerAccounts(query) {
    //         return ajaxResolver(axios.get("/api/user/get-all", { params: query }));
    //     },
    // },
    // put: {
    //     async changePassword(data) {
    //         return ajaxResolver(axios.put(`/api/user/change-password`, data));
    //     },
    // },
  },
  user: {
    async suspend(username) {
      return ajaxResolver(axios.post(`/admin/suspend-user`, { username }));
    },
    async activate(username) {
      return ajaxResolver(axios.post(`/admin/activate-user`, { username }));
    },
    async viewDesigners() {
      return ajaxResolver(axios.get(`/admin/view-designers`));
    },
    async viewAdmins() {
      return ajaxResolver(axios.get(`/admin/list-admins`));
    },
    async viewSurvey(surveyId) {
      return ajaxResolver(axios.post(`/user/access-survey`, surveyId));
    },
    async submitData(data) {
      return ajaxResolver(axios.post(`/user/submit-survey`, data));
    },
    async resetPassword(data) {
      return ajaxResolver(axios.post(`/admin/reset-password`, data));
    },
    async adminEditProfile(data) {
      return ajaxResolver(axios.put(`/admin/edit-user-profile`, data));
    },
  },
  designer: {
    async uploadImage(imagedata) {
      return ajaxResolver(axios.post(`designer/get-presigned-url`, imagedata));
    },
    async createSurvey(survey) {
      return ajaxResolver(axios.post(`designer/create-survey`, survey));
    },
    async viewSurvey(surveyId) {
      return ajaxResolver(axios.post(`esigner/get-survey`, surveyId));
    },
    async updateSurvey(survey) {
      return ajaxResolver(axios.put(`/designer/update-survey`, survey));
    },
  },
  survey: {
    async viewAll(query) {
      return ajaxResolver(axios.post(`/designer/view-surveys`, query));
    },
    async suspendSurvey(surveyId, status) {
      return ajaxResolver(
        axios.put(`/designer/active-survey`, { surveyId, surveyStatus: status })
      );
    },
    async archiveSurvey(surveyId, isArchived) {
      return ajaxResolver(
        axios.put(`/designer/archive-survey`, { surveyId, isArchived })
      );
    },
    async deleteSurvey(surveyId) {
      return ajaxResolver(
        axios.delete(`/admin/delete-survey`, { data: { surveyId } })
      );
    },
  },
  surveyresponse: {
    async submitData(query) {
      return ajaxResolver(axios.post(`user/submit-survey`, query));
    },
  },
  backups: {
    async listBackups() {
      return ajaxResolver(axios.get(`/admin/list-backup`));
    },
    async create() {
      return ajaxResolver(axios.get(`/admin/create-backup`));
    },
  },
  response: {
    async getResponse(surveyId) {
      return ajaxResolver(axios.post(`/designer/view-response`, { surveyId }));
    },
  },
};
