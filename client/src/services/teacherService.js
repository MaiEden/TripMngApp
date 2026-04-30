import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/teachers";

export const getTeacherById = (teacherId) => axios.get(`${REST_API_BASE_URL}/get/${teacherId}`);

export const getStudents = (teacherId) => axios.get(`${REST_API_BASE_URL}/getStudents/${teacherId}`);

export const registerTeacher = (teacherData) => axios.post(`${REST_API_BASE_URL}/register`, teacherData);

export const loginTeacher = (teacherData) => axios.post(`${REST_API_BASE_URL}/login`, teacherData);