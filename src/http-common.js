import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});

const auth = axios.create({
  baseURL: "localhost:3000/auth",
  headers: {
    "Content-type": "application/json"
  }
});

export { http, auth }