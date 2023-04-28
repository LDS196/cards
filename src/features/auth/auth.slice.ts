import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../common/utils/create-app-async-thunk"
import { authApi, LoginParamsType, ProfileType, RegisterParamsType, RegisterResponseType } from "features/auth/auth.api"
import { ChangeEmailData, InfoResponseType } from "../auth/auth.api"

const register = createAppAsyncThunk<RegisterResponseType, RegisterParamsType>(
    "auth/register",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await authApi.register(arg)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
const login = createAppAsyncThunk<{ profile: ProfileType }, LoginParamsType>("auth/register", async (arg, ThunkApi) => {
    const { rejectWithValue } = ThunkApi
    try {
        const res = await authApi.login(arg)
        return { profile: res.data }
        console.log(res.data)
    } catch (e) {
        return rejectWithValue(e)
    }
})
const initializeApp = createAppAsyncThunk<{ isLoginIn: boolean }, void>("app/initializeApp", async (arg, ThunkApi) => {
    const { rejectWithValue } = ThunkApi
    try {
        const res = await authApi.me()
        return { isLoginIn: true }
    } catch (e) {
        return rejectWithValue(e)
    }

})
const forgotPassword = createAppAsyncThunk<InfoResponseType, ChangeEmailData>("app/forgotPassword", async (arg, ThunkApi) => {
    const { rejectWithValue } = ThunkApi
    try {
        const res = await authApi.forgotPassword(arg)
        console.log(res.data)
        return res.data
    } catch (e) {
        return rejectWithValue(e)
    }

})
const slice = createSlice({
    name: "auth",
    initialState: {
        profile: null as ProfileType | null,
        isLoginIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authThunks.login.fulfilled, (state, action) => {
                state.profile = action.payload.profile
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoginIn = action.payload.isLoginIn
            })
          .addCase(forgotPassword.fulfilled, (state, action) => {

          })
    },
})

export const authReducer = slice.reducer
export const authThunks = { forgotPassword,register, login, initializeApp }
