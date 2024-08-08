

// api đăng nhập

import { instance } from ".."

// api đăng kí

export const registerApi = async(user : object)=>{
    const res = await instance.post("register",user)
    return res.data;
}

export const loginApi = async(data : {email: string, password: string})=>{
    const res = await instance.post("login", data);
    return res.data;    
}

