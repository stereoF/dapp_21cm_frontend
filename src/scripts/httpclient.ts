// import * as dotenv from "dotenv";
// dotenv.config();
import axios from 'axios'

// const { VUE_APP_BASE_URL } = process.env
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
export function useAxios() {
    const axiosInstance = axios.create({
        baseURL: VITE_BASE_URL,
        // timeout: 10000,
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // }
    })
    return { axiosInstance }
}