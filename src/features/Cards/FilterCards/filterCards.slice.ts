import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialStateType = {
    question: string
    sortBy: {
        name: string
        sortType: string
    }
}

const initialState: InitialStateType = {
    question: "",
    sortBy: {
        name: "",
        sortType: "",
    },
}
export const slice = createSlice({
    name: "filterCards",
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.question = action.payload
        },
        sortCards: (state, action: PayloadAction<{ name: string; sortType: string }>) => {
            state.sortBy = { ...action.payload }
        },
        clearFilterCards: (state, action: PayloadAction<InitialStateType>) => {
            return { ...action.payload }
        },
    },
})
export const filterCardsActions = slice.actions
export const filterCardsReducer = slice.reducer
