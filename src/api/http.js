import axios from "axios";

import { getToken, removeToken } from "../utils/localStorage";
import { store } from "../redux/store";
import { ValueChanged } from "../redux/actions/flightAction";

const createAxios = (baseURL) => {
  const Axios = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    timeoutErrorMessage: "Request Timeout",
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;

      store.dispatch(
        ValueChanged("uploadPercent", parseFloat(percentCompleted).toFixed(2))
      );
    },
    onUploadProgress: (progressEvent) => {
      let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;

      store.dispatch(
        ValueChanged("uploadPercent", parseFloat(percentCompleted).toFixed(2))
      );
    },
  });

  Axios.interceptors.response.use(
    async (response) => {
      return response.data;
    },
    async (error) => {
      console.log(error);
      let originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        // if the error is 401 and hasent already been retried
        originalRequest._retry = true; // now it can be retried
        try {
          const token = await getToken();

          Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return Axios(originalRequest);
        } catch (error) {
          if (error.response.status === 401) {
            // logout dispatch
            store.dispatch(ValueChanged("isLogin", false));
            store.dispatch(ValueChanged("userDetails", {}));
            await removeToken();
            alert("Session Expired");
            //clearStorage();
          }
        }
      } else if (error.response.status == 500) {
        return {
          status: false,
          statusCode: error.response.status,
          message: "Internal Server Error",
          data: error.response.data,
        };
      } else if (error.message == "Request Timeout" || "timeout") {
        return {
          status: false,
          statusCode: error.response.status,
          message: "Request Timeout",
          data: error.response.data,
        };
      } else if (
        error.response.data &&
        typeof error.response.data == "object"
      ) {
        return error.response.data;
      } else {
        return {
          status: false,
          statusCode: error.response.status,
          message: error.response.data,
          data: error.response.data,
        };
      }

      // return error.response.data ? error.response.data : error.response;
    }
  );

  Axios.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => {
      if (error.response.data && typeof error.response.data == "object") {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({
          status: false,
          statusCode: error.response.status,
          message: "Something Went Wrong",
          data: null,
        });
      }
    }
  );

  return Axios;
};

const api = createAxios("https://stagingarb.ciplcrm.org.in/api/");

const http = {
  api,
};

export default http;
