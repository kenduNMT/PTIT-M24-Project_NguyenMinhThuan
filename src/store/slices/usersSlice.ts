import { RootState } from './../index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../service/user/auth";
import { instance } from "../../service";
import { UserType } from "../../config/interfaces";
import axios from 'axios';

const userLogin: UserType | null = null;

const initState = {
    isLoading: false,
    error: "",
    userLogin: userLogin,
    userProfile: userLogin
};

export const loginUser: any = createAsyncThunk(
    "user/login",
    (data: { email: string; password: string }) => {
        return loginApi(data);
    }
);

export const registerUser: any = createAsyncThunk(
    "user/register",
    async (data: object) => {
        // call api
        const res = await instance.post("register", data);
        return res.data;
    }
);

export const logoutUser: any = createAsyncThunk("user/logout", async () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("role"); // Xóa role khỏi localStorage
    localStorage.removeItem("userLogin");
    return {};
});

export const fetchUserProfile : any = createAsyncThunk(
    "user/fetchProfile",
    async (userId: number) => {
        const response = await instance.get(`/users/${userId}`);
        return response.data;
    }
);

// Update user profile
export const updateUserProfile : any = createAsyncThunk(
    "user/updateProfile",
    async (data: { userId: number; email: string; fullName: string; phone: string; birthday: string; password?: string;}) => {
        const response = await instance.patch(`/users/${data.userId}`, {
            email: data.email,
            fullName: data.fullName,
            phone: data.phone,
            birthday: data.birthday,
            password: data.password,
        });
        return response.data;
    }
);

// Tạo một thunk để lấy dữ liệu người dùng từ API
export const fetchAllUsers : any = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        const response = await instance.get('/users');
        return response.data;
    }
);

// Thêm action để cập nhật trạng thái block của người dùng
export const toggleBlockUser : any = createAsyncThunk(
    'users/toggleBlockUser',
    async ({userId, block}:{userId:number,block:boolean}) => {
        const res= await instance.patch("users/"+userId,{block})
        return res.data
    }
);

// Add new user
export const addUser : any = createAsyncThunk('users/addUser', async (newUser: { email: string; password: string }) => {
    const API_URL = 'http://localhost:9999/users';
    const response = await axios.post(API_URL, newUser);
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userProfile = action.payload;
            state.error = null;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Đã xảy ra lỗi";
        })
        .addCase(updateUserProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userProfile = action.payload;
            state.error = null;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Đã xảy ra lỗi";
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            // cập nhật state
            // state.userLogin = action.payload;
            // lưu token vào localStorage
            localStorage.setItem("access_token", action.payload.accessToken);
            localStorage.setItem("users", JSON.stringify(action.payload.user)); // lưu thông tin người dùng
        });

        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                // đăng nhập thành công
                localStorage.setItem("access_token", action.payload.accessToken);
                localStorage.setItem("userLogin", JSON.stringify(action.payload.user)); // lưu thông tin người dùng
                state.userLogin = action.payload.user;
                // Thiết lập tài khoản admin cứng cho kiểm tra
                if (action.payload.user.email === 'admin@gmail.com') {
                    localStorage.setItem('role', 'ADMIN');
                } else {
                    localStorage.setItem('role', 'USER'); // Hoặc giá trị khác tùy thuộc vào vai trò của người dùng
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                // xử lý lỗi đăng nhập
                if (action.error.message === 'Tài khoản đã bị khóa') {
                    state.error = "Tài khoản đã bị khóa";
                } else {
                    state.error =  "Tên đăng nhập hoặc mật khẩu không đúng";
                }
            })
            .addCase(logoutUser.fulfilled, (state) => {
                // đăng xuất thành công
                state.userLogin = null;
                localStorage.removeItem("access_token");
            });
            builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
            builder.addCase(toggleBlockUser.fulfilled, (state, action) => {
                const { userId, block } = action.payload;
                const user = state.users.find(user => user.id === userId);
                if (user) {
                    user.block = block;
                }
            })
            .addCase(toggleBlockUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
            builder.addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            });
    },
});

export const { reducer } = userSlice;
