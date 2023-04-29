import { instance } from "../../common/api/common.api"

export const authApi = {
    register(data: RegisterParamsType) {
        return instance.post<RegisterResponseType>("/auth/register", data)
    },
    login(data: LoginParamsType) {
        return instance.post<ProfileType>("/auth/login", data)
    },
    me() {
        return instance.post<ProfileType>("/auth/me", {})
    },
    forgotPassword(data: ChangeEmailData) {
        return instance.post<InfoResponseType>("/auth/forgot", data)
    },
    changeProfileData(data: { name: string }) {
        return instance.put<ChangeNameResponseType>("/auth/me", data)
    },
    logout() {
        return instance.delete<InfoResponseType>("/auth/me")
    },
    setNewPassword(data: NewPasswordType) {
        return instance.post<InfoResponseType>("/auth/set-new-password", data)
    },
}

export type NewPasswordType = {
    password: string
    resetPasswordToken: string| undefined
}
export type ChangeNameResponseType = {
    updatedUser: ProfileType
    errors: string
}

export type ChangeEmailData = {
    email: string
    message: string
}

export type InfoResponseType = {
    info: string
    error: string
}
export type RegisterParamsType = Omit<LoginParamsType, "rememberMe">
export type RegisterResponseType = {
    addedUser: {}
    error?: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ProfileType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: string
    error?: string
    avatar: string
}
