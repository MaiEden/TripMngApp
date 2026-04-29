import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/Locations";

export const getLocationById = (userId) => axios.get(`${REST_API_BASE_URL}/get/${userId}`);