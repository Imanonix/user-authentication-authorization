import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService'


interface userInfoLogin {
    email: string
    password: string
}

interface userInfoRegister {
    email: string
    password: string
    repassword: string
    username: string
}
interface userRespons{
    isLogedIn: boolean
    userName: string
}

const initialState = {
    userInfo: null as userInfoLogin | null as userInfoRegister |userRespons | null ,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null as any,
}

export const login = createAsyncThunk(
    'users/login',
    async (userInfo:userInfoLogin, thunkAPI) => {
        try {
            const response = await userService.loginForm(userInfo)
            console.log("response in login",response)
            userInfo = response
            console.log("userInfo", userInfo)
            return response;

        } catch (error) {
            const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    });

export const registerForm = createAsyncThunk(
    'users/register',
    async (userInfo:userInfoRegister, thunkAPI) => {
        try {
            console.log("first")
            return await userService.registerForm(userInfo) 
        } catch (error) {
            const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

export const logout = createAsyncThunk(
    'users/logout',
    async (_, thunkAPI) => {
        try {
            return await userService.logoutForm() 
        } catch (error) {
            const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerForm.pending, (state) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ''
        })
        .addCase(registerForm.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess= true
            state.isError = false
            state.userInfo = action.payload
        })
        .addCase(registerForm.rejected, (state, action) =>{
            state.isLoading=false
            state.isError= true
            state.isSuccess = false;
            state.message = action.payload ? action.payload : 'An error occurred during registration.';
            state.userInfo = null
        })
        .addCase(login.pending, (state) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ''
        })
        .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess= true
            state.isError = false
            state.userInfo = action.payload;
        })
        .addCase(login.rejected, (state, action) =>{
            state.isLoading=false
            state.isError= true
            state.isSuccess = false;
            state.message = action.payload ? action.payload : 'An error occurred during login.';
            state.userInfo = null
        })
        .addCase(logout.pending, (state) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ''
        })
        .addCase(logout.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess= true
            state.isError = false
            state.userInfo = null;
        })
        .addCase(logout.rejected, (state, action) =>{
            state.isLoading=false
            state.isError= true
            state.isSuccess = false;
            state.message = action.payload ? action.payload : 'An error occurred during logout.';
            state.userInfo = null
        })

    }

});

export const { reset } = authSlice.actions
export default authSlice.reducer