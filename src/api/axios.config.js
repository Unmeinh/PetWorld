import axios from "axios";

const axiosJSON = axios.create();
const apiURL = "https://29f9-2402-800-6189-1302-fd9c-a03d-3486-b000.ngrok-free.app/api";

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
    baseURL: `https://29f9-2402-800-6189-1302-fd9c-a03d-3486-b000.ngrok-free.app/api`,
});

export {axiosJSON, axiosFormData};
export default instance;