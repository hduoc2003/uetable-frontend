import getEnv from "@/utils/getEnv";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const cookies = new Cookies();

const FetcherAuth = axios.create({
    baseURL: process.env.API_URL
});

FetcherAuth.interceptors.request.use((config) => {
    const authToken = cookies.get('authToken');
    config.headers['Authorization'] = `Bearer ${authToken}`;
    //console.log(authToken);
    return config;
  }, (error) => {
    return Promise.reject(error);
});

FetcherAuth.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default FetcherAuth;