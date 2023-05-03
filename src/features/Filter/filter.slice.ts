import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialStateType = {
    packName: string
    max: number| undefined
    min: number| undefined
    user_id: string
    block:boolean
}

const initialState: InitialStateType = {
    packName: "",
    max: undefined,
    min: undefined,
    user_id: "",
    block:false

}
export const slice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.packName = action.payload
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.user_id = action.payload
        },
        setMinCardsCount: (state, action: PayloadAction<number>) => {
            state.min = action.payload

        },
        setMaxCardsCount: (state, action: PayloadAction<number>) => {
            state.max = action.payload
        },
    },
})
export const filterActions = slice.actions
export const filterReducer = slice.reducer
