import axios from "axios";


const API_URL = 'http://localhost:9999/exams';

export const fetchExams = async () => {
    return axios.get(API_URL);
};

export const addExam = async (examData: any) => {
    return axios.post(API_URL, examData);
};

export const updateExam = async (id: number, examData: any) => {
    return axios.put(`${API_URL}/${id}`, examData);
};

export const deleteExam = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};