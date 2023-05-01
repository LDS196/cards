import { RootState } from "app/store"

export const selectProfile = (state: RootState) => state.auth.profile
export const selectUserId = (state: RootState) => state.auth.profile?._id