import axios from 'axios';

const API_URL = 'http://localhost:9999/examSubjects';

export const fetchExamSubjects = async () => {
    return axios.get(API_URL);
};

export const addExamSubject = async (examSubjectData: any) => {
    return axios.post(API_URL, examSubjectData);
};

export const updateExamSubject = async (id: number, examSubjectData: any) => {
    return axios.put(`${API_URL}/${id}`, examSubjectData);
};

export const deleteExamSubject = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};
