"use client"

import axios from "axios";

const apiVersion = "/api/v1"
const baseURL = "http://localhost:8080";

const apiClient = axios.create({
  baseURL: baseURL + apiVersion,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
