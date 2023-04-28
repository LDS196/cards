import { RootState } from "app/store"

export const selectIsLoginIn = (state: RootState) => state.auth.isLoginIn
