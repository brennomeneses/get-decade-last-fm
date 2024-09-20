import axios from "axios";

export const musicBrainz = axios.create({
  baseURL: "https://musicbrainz.org/ws/2/",
  headers: {
    "User-Agent": "GetDecadeLastFM/0.0.1 (https://github.com/brennomeneses/GetDecadeLastFM)",
  }
});