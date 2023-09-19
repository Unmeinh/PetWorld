import axios from "axios";

const apiURL = "https://7768-2402-800-61c4-c98-bd5e-d6b-a9d0-aa3c.ngrok-free.app/api";

// axiosAPi.defaults.timeout = 2000;

// axiosAPi.defaults.withCredentials = true;
let axiosAPi = axios.create();

axiosAPi.defaults.baseURL = apiURL;

export default axiosAPi;