import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import { appReducer } from "app/app.slice"

import { authReducer } from "features/auth/auth.slice"
import { packsReducer } from "features/Packs/packs.slise"
import { filterReducer } from "features/Filter/filter.slice"

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        app: appReducer,
        auth: authReducer,
        packs: packsReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
