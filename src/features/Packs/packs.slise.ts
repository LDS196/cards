import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { FilterParamsType, packsApi, PackType, ResponseCardPacks } from "features/Packs/packs.api"

const getPacks = createAppAsyncThunk<ResponseCardPacks, FilterParamsType>("packs/getPacks", async (arg, ThunkApi) => {
    const { rejectWithValue } = ThunkApi
    try {
        const res = await packsApi.getPacks(arg)
        return res.data
    } catch (e: any) {
        console.log(e.response.data.error)
        return rejectWithValue(null)
    }
})

type InitialStateType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}
export const slice = createSlice({
    name: "packs",
    initialState,
    reducers: {
        changePageSize: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPacks.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.pageCount = action.payload.pageCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.minCardsCount = action.payload.minCardsCount
            state.page = action.payload.page
        })
    },
})
export  const packsActions= slice.actions
export const packsReducer = slice.reducer
export const packsThunks = { getPacks }
