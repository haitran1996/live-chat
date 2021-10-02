const axios = require('axios');

export function apiClient() {
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  return axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrf
    }
  });
}
