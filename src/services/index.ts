import axios from "axios";

export const api = axios.create({
  baseURL: "https://ws.audioscrobbler.com/2.0/",
});