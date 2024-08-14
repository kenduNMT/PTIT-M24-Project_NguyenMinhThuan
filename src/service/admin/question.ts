import axios from 'axios';

const API_URL = 'http://localhost:9999/questions';

export const fetchQuestions = async () => {
    return axios.get(API_URL);
};

export const addQuestion = async (questionData: any) => {
    return axios.post(API_URL, questionData);
};

export const updateQuestion = async (id: number, questionData: any) => {
    return axios.put(`${API_URL}/${id}`, questionData);
};

export const deleteQuestion = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};
