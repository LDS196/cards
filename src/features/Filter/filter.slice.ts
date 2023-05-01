import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialStateType = {
    packName: string
    max: number
    min: number
    user_id: string
    block:boolean
}

const initialState: InitialStateType = {
    packName: "",
    max: 100,
    min: 0,
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
    },
})
export const filterActions = slice.actions
export const filterReducer = slice.reducer
