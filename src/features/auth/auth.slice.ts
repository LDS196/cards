import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import {
  authApi, ChangeDataResponseType,
  LoginParamsType,
  NewPasswordType,
  ProfileType,
  RegisterParamsType,
  RegisterResponseType
} from "features/auth/auth.api"
import { ChangeEmailData, InfoResponseType } from "../auth/auth.api"
import { appActions } from "app/app.slice"

const register = createAppAsyncThunk<RegisterResponseType, RegisterParamsType>(
    "auth/register",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.register(arg)
            return res.data
        } catch (e) {
            alert(e)
            return rejectWithValue(e)
        }
    }
)
const login = createAppAsyncThunk<{ profile: ProfileType; isLoginIn: boolean }, LoginParamsType>(
    "auth/register",
    async (arg, ThunkApi) => {
        const { rejectWithValue} = ThunkApi
        try {
            const res = await authApi.login(arg)
            return { profile: res.data, isLoginIn: true }
        } catch (e: any) {
            alert(e.response.data.error)
            return rejectWithValue(e)
        }
    }
)
const logout = createAppAsyncThunk<{ isLoginIn: boolean }, void>("auth/logout", async (_, ThunkApi) => {
    const { rejectWithValue,} = ThunkApi
    try {
        const res = await authApi.logout()
        return { isLoginIn: false }
    } catch (e) {
        return rejectWithValue(e)
    }
})
const initializeApp = createAppAsyncThunk<{ isLoginIn: boolean }, void>("app/initializeApp", async (arg, ThunkApi) => {
    const { rejectWithValue, dispatch } = ThunkApi
    try {
        const res = await authApi.me()
        return { isLoginIn: true }
    } catch (e) {
        return rejectWithValue(e)
    } finally {
        dispatch(appActions.setAppInitialized({ isAppInitialized: true }))
    }
})
const forgotPassword = createAppAsyncThunk<InfoResponseType, ChangeEmailData>(
    "app/forgotPassword",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.forgotPassword(arg)
            return res.data
        } catch (e: any) {
            return rejectWithValue(e)
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
        } catch (e: any) {
            console.log(e.response.data.error)
            return rejectWithValue(e)
        }
    }
)
const changeProfileData = createAppAsyncThunk<ChangeDataResponseType, { name:string,avatar:string }>(
    "auth/changeProfileData",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.changeProfileData(arg)
            return res.data
        } catch (e: any) {
            console.log(e.response.data.error)

            return rejectWithValue(e)
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
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {

            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoginIn = action.payload.isLoginIn
            })
          .addCase(changeProfileData.fulfilled, (state, action) => {
            state.profile = action.payload.updatedUser
          })
    },
})

export const authReducer = slice.reducer
export const authThunks = { changeProfileData,setNewPassword, forgotPassword, register, login, initializeApp, logout }
