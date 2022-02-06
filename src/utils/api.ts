import axios from "axios";

const fastApi = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "INIY9YzZkxTfcbjtbUp3VYtx5TH1bFwUyZIuWBMX",
    Accept: "*/*",
  },
});

export default fastApi;
