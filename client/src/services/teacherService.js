import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/teacher";

export const getTeacherById = (teacherId) => axios.get(`${REST_API_BASE_URL}/get/${teacherId}`);

export const getStudents = (teacherId) => axios.get(`${REST_API_BASE_URL}/getStudents/${teacherId}`);