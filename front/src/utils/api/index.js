import axios from "axios";

import { handleUnAuthorizeError } from "../interceptors/response";

// TODO@PP : add env variables

let api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(response => response, handleUnAuthorizeError)

export default api