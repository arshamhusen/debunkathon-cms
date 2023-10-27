import env from "../../environments";
import { login } from "@/features/Auth/Services/authService";
import store from "@/stores";
import { AxiosInstance } from "axios";

const addAxiosInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.request.use((config) => {
    if (
      config.baseURL?.startsWith(env.ResourceServer.Endpoint) ||
      config.url?.startsWith(env.ResourceServer.Endpoint)
    ) {
      const token = store.getState()?.auth.token;
      // The getAccessToken function is oidc-client-ts for Azure B2C authentication.
      // const token = getAccessToken();

      // The token is hard coded for now. In a real application, the token should be fetched from the auth service.
      // The reason is that the auth flow is yet to be finalized. For now, the token is hard coded.

      console.log("token", token);

      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (401 === error.response?.status) {
        // login(window.location.href);
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
};

export default addAxiosInterceptors;
