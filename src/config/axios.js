import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const customAxios = axios.create({
  baseURL: API_BASE_URL,
  'Content-Type': 'application/json;charset=UTF-8',
});
