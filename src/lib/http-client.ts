import axios from "axios";

import env from "../../environments";
import addAxiosInterceptors from "@/middlewares/axiosInterceptors";

const instance = axios.create({
  baseURL: env.ResourceServer.Endpoint,
});

addAxiosInterceptors(instance);

export default instance;
