

// api đăng nhập

import { instance } from ".."

// api đăng kí

export const registerApi = async(user : object)=>{
    const res = await instance.post("register",user)
    return res.data;
}

export const loginApi = async(data : {email: string, password: string})=>{
    try {
        const res = await instance.post("login", data);
        const user = res.data;

        return user;    
    } catch (error: any) {
        console.error('Lỗi khi gửi yêu cầu:', error.response?.data || error.message);
        throw error;
    }
}

export const updateUserProfile = async (userId : number, userData : object) => {
    try {
        const response = await instance.patch(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};
