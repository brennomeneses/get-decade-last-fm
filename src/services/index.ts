import axios from "axios";

export const api = axios.create({
  baseURL: "http://ws.audioscrobbler.com/2.0/",
});