import axios from "axios";
const api = "10.0.2.2:3000"
const client = axios.create({
    baseURL: `http://${api}/api`,
    headers: {
        "Accept":"application/json",
        "Content-Type": "application/json"
    }
});

export default client;