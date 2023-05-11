import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import {
    authApi,
    ChangeDataResponseType,
    LoginParamsType,
    NewPasswordType,
    ProfileType,
    RegisterParamsType,
    RegisterResponseType,
} from "features/auth/auth.api"
import { ChangeEmailData, InfoResponseType } from "../auth/auth.api"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"

const register = createAppAsyncThunk<RegisterResponseType, RegisterParamsType>(
    "auth/register",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.register(arg)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const login = createAppAsyncThunk<{ profile: ProfileType; isLoginIn: boolean }, LoginParamsType>(
    "auth/register",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.login(arg)
            return { profile: res.data, isLoginIn: true }
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const logout = createAppAsyncThunk<{ isLoginIn: boolean }, void>("auth/logout", async (_, ThunkApi) => {
    const { rejectWithValue } = ThunkApi
    try {
        await authApi.logout()
        return { isLoginIn: false }
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const initializeApp = createAppAsyncThunk<{ profile: ProfileType; isLoginIn: boolean }, void>(
    "app/initializeApp",
    async (arg, ThunkApi) => {
        const { rejectWithValue} = ThunkApi
        try {
            const res = await authApi.me()
            return { profile: res.data, isLoginIn: true }

        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error, false))
        }
    }
)
const forgotPassword = createAppAsyncThunk<InfoResponseType, ChangeEmailData>(
    "app/forgotPassword",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.forgotPassword(arg)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const setNewPassword = createAppAsyncThunk<InfoResponseType, NewPasswordType>(
    "auth/forgotPassword",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.setNewPassword(arg)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const changeProfileData = createAppAsyncThunk<ChangeDataResponseType, { name?: string; avatar?: string }>(
    "auth/changeProfileData",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.changeProfileData(arg)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const slice = createSlice({
    name: "auth",
    initialState: {
        profile: null as ProfileType | null,
        isLoginIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.profile = action.payload.profile
                state.isLoginIn = action.payload.isLoginIn
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoginIn = action.payload.isLoginIn
                state.profile = action.payload.profile
            })
            .addCase(forgotPassword.fulfilled, () => {})
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoginIn = action.payload.isLoginIn
            })
            .addCase(changeProfileData.fulfilled, (state, action) => {
                state.profile = action.payload.updatedUser
            })
    },
})

export const authReducer = slice.reducer
export const authThunks = { changeProfileData, setNewPassword, forgotPassword, register, login, initializeApp, logout }
