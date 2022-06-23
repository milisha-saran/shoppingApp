import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_API });

export const setApiHeader = (token) => {
  API.defaults.headers.common["authorisation"] = token;
};
