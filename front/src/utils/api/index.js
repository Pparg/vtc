import axios from "axios";

// TODO@PP : add env variables

let api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})


export default api