import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../service/user/auth";
import { instance } from "../../service";
import { UserType } from "../../config/interfaces";
import { useNavigate } from "react-router-dom";

const userLogin: UserType | null = null;

const initState = {
    isLoading: false,
    error: "",
    userLogin: userLogin,
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

    return {};
});

const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            // cập nhật state
            state.userLogin = action.payload;
            // lưu token vào localStorage
            localStorage.setItem("access_token", action.payload.accessToken);
        });

        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                // đăng nhập thành công
                localStorage.setItem("access_token", action.payload.accessToken);
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
                if (action.payload?.status === 400) {
                    state.error = "Tên đăng nhập hoặc mật khẩu không đúng";
                }
            })
            .addCase(logoutUser.fulfilled, (state) => {
                // đăng xuất thành công
                state.userLogin = null;
                localStorage.removeItem("access_token");
            });
    },
});

export const { reducer } = userSlice;
