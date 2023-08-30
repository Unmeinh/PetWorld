import axios from "axios";
const axiosJSON = axios.create();
const apiURL = "https://10.0.2.2:3000/api";

axiosJSON.defaults.baseURL = apiURL;

axiosJSON.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Content-Type": "application/x-www-form-urlencoded",
};

const axiosFormData = axios.create();

axiosFormData.defaults.baseURL = apiURL;

axiosFormData.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
};

// axiosJSON.defaults.timeout = 2000;

// axiosJSON.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: `http://10.0.2.2:3000/api`,
});

export {axiosJSON, axiosFormData};
export default instance;
