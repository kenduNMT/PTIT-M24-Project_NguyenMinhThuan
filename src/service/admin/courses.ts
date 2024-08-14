import axios from "axios";

const API_URL = 'http://localhost:9999/courses';

// Fetch danh sách các khóa học
export const fetchCourses = async () => {
    return axios.get(API_URL);
};

// Thêm một khóa học mới
export const addCourse = async (courseData: any) => {
    return axios.post(API_URL, courseData);
};

// Cập nhật thông tin một khóa học
export const updateCourse = async (id: number, courseData: any) => {
    return axios.put(`${API_URL}/${id}`, courseData);
};

// Xóa một khóa học
export const deleteCourse = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};
