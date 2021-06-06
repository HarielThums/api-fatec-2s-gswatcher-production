import axios from "axios";

export default axios.create({
  baseURL: "https://api-gswatcher.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});

const http = axios.create({
  baseURL: "https://api-gswatcher.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});

const auth = axios.create({
  baseURL: "https://api-gswatcher.herokuapp.com/auth",
  headers: {
    "Content-type": "application/json"
  }
});

export { http, auth }