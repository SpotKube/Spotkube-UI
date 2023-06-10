import axios from "axios";
import { thunks } from "../store";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

/**
 * Setup Axios
 */
const BASE_URL_REMOTE = process.env.REACT_APP_BASE_URL_REMOTE;

const DEFAULT_BASE_URL = BASE_URL_REMOTE;

export const BACK_END_URL = {
  DEFAULT_BASE_URL,
};

axios.defaults.baseURL = DEFAULT_BASE_URL;
axios.defaults.timeout = 100000;

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
        history.replace("/swagger");
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
      history.replace("/swagger");
      return;
    }, 2000);
    return false;
  }
};

function readStatus(res) {
  if (!res || !res.status) {
    return {
      status: 408,
      message: "Network Error",
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
    let response = res.data;
    if (!response.hasOwnProperty("status")) {
      response.status = res.status;
    }
    return response;
  } catch (e) {
    const res = e.response;
    return readStatus(res);
  }
}

/**
 * Form data config to send images
 */
// eslint-disable-next-line no-unused-vars
const formDataConfig = {
  headers: { "content-type": "multipart/form-data" },
};

const timeOut = 100000;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fullFlow: {
    async home() {
      return ajaxResolver(axios.get(`/`));
    },
    async startUpAwsCloud() {
      return ajaxResolver(axios.post(`/startup_aws_cloud`, {}));
    },
    async updateAwsCloud() {
      return ajaxResolver(axios.post(`/update_aws_cloud`, {}));
    },
    async startUpPrivateCloud() {
      return ajaxResolver(axios.post(`/startup_private_cloud`, {}));
    },
    async updatePrivateCloud() {
      return ajaxResolver(axios.post(`/update_private_cloud`, {}));
    },
  },
  optimizationEngine: {
    async getNodes() {
      return ajaxResolver(axios.post(`/opt_eng/get_nodes`, {}));
    },
  },
  helmService: {
    async home() {
      return ajaxResolver(axios.get(`/helm_service/`));
    },
    async deployPrivate() {
      return ajaxResolver(axios.get(`/helm_service/deploy_private`));
    },
    async deployAws() {
      return ajaxResolver(axios.get(`/helm_service/deploy_aws`));
    },
  },
  nodeAllocator: {
    privateCloud: {
      async home() {
        return ajaxResolver(axios.get(`/node_allocator/private/`));
      },
      async destroy() {
        return ajaxResolver(axios.get(`/node_allocator/private/destroy`));
      },
      async destroyAndProvision() {
        return ajaxResolver(
          axios.get(`/node_allocator/private/destroy_and_provision`)
        );
      },
      async provision() {
        return ajaxResolver(axios.get(`/node_allocator/private/provision`));
      },
      async apply() {
        return ajaxResolver(axios.get(`/node_allocator/private/apply`));
      },
      async configure() {
        return ajaxResolver(axios.get(`/node_allocator/private/configure`));
      },
      async writeTerraformOutput() {
        return ajaxResolver(
          axios.get(`/node_allocator/private/write_terraform_output`)
        );
      },
    },
    awsCloud: {
      async home() {
        return ajaxResolver(axios.get(`/node_allocator/aws/`));
      },
      async destroy() {
        return ajaxResolver(axios.get(`/node_allocator/aws/destroy`));
      },
      async destroyAndProvision() {
        return ajaxResolver(
          axios.get(`/node_allocator/aws/destroy_and_provision`)
        );
      },
      async provision() {
        return ajaxResolver(axios.get(`/node_allocator/aws/provision`));
      },
      async apply() {
        return ajaxResolver(axios.get(`/node_allocator/aws/apply`));
      },
      async configure() {
        return ajaxResolver(axios.get(`/node_allocator/aws/configure`));
      },
      async writeTerraformOutput() {
        return ajaxResolver(
          axios.get(`/node_allocator/aws/write_terraform_output`)
        );
      },
    },
  },
  logs: {
    privateCloud: {
      async provisioning() {
        return ajaxResolver(axios.get(`/log/private_provisioning_log`));
      },
      async configuring() {
        return ajaxResolver(axios.get(`/log/private_configure_log`));
      },
      async deploying() {
        return ajaxResolver(axios.get(`/log/private_deploy_log`));
      },
    },
    awsCloud: {
      async provisioning() {
        return ajaxResolver(axios.get(`/log/aws_provisioning_log`));
      },
      async configuring() {
        return ajaxResolver(axios.get(`/log/aws_configure_log`));
      },
      async deploying() {
        return ajaxResolver(axios.get(`/log/aws_deploy_log`));
      },
    },
  },
};
