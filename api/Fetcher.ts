import axios from "axios";
import Cookies from "universal-cookie";
import { isUndefined } from "lodash";

const cookies = new Cookies();

const Fetcher = axios.create({
    baseURL: process.env.API_URL
});

Fetcher.interceptors.request.use((config) => {
    const authToken = cookies.get('authToken');
    if (!isUndefined(authToken))
        config.headers['Authorization'] = `Bearer ${authToken}`;
    //console.log(authToken);
    return config;
  }, (error) => {
    return Promise.reject(error);
});

Fetcher.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default Fetcher;
