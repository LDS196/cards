import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import {
    FilterParamsType,
    NewPackType,
    packsApi,
    PackType,
    ResponseCardPacks,
    UpdatePackType,
} from "features/Packs/packs.api"
import { filterActions } from "features/Filter/filter.slice"
import { RootState } from "app/store"

const getPacks = createAppAsyncThunk<ResponseCardPacks, FilterParamsType, { state: RootState }>(
    "packs/getPacks",
    async (arg, ThunkApi) => {
        const { rejectWithValue, dispatch, getState } = ThunkApi
        try {
            const res = await packsApi.getPacks(arg)
            const { min, max } = getState().filter
            if (min === undefined && max === undefined) {
                dispatch(filterActions.setMaxCardsCount(res.data.maxCardsCount))
                dispatch(filterActions.setMinCardsCount(res.data.minCardsCount))
            }

            return res.data
        } catch (e: any) {
            console.log(e.response.data.error)
            return rejectWithValue(null)
        }
    }
)
const createPack = createAppAsyncThunk<void, NewPackType>("packs/createPack", async (arg, ThunkApi) => {
    const { rejectWithValue, dispatch } = ThunkApi
    try {
        await packsApi.createPack(arg)
        dispatch(getPacks({}))
    } catch (e: any) {
        rejectWithValue(null)
    }
})
const deletePack = createAppAsyncThunk<void, { id: string }>("packs/deletePack", async (arg, ThunkApi) => {
    const { rejectWithValue, dispatch } = ThunkApi
    try {
        await packsApi.deletePack(arg.id)

        dispatch(getPacks({}))
    } catch (e: any) {
        rejectWithValue(null)
    }
})
const updatePack = createAppAsyncThunk<void, UpdatePackType>("packs/updatePack", async (arg, ThunkApi) => {
    const { rejectWithValue, dispatch } = ThunkApi
    try {
        await packsApi.updatePack(arg)
        dispatch(getPacks({}))
    } catch (e: any) {
        rejectWithValue(null)
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
        builder
            .addCase(getPacks.fulfilled, (state, action) => {
                state.cardPacks = action.payload.cardPacks
                state.cardPacksTotalCount = action.payload.cardPacksTotalCount
                state.pageCount = action.payload.pageCount
                state.maxCardsCount = action.payload.maxCardsCount
                state.minCardsCount = action.payload.minCardsCount
                state.page = action.payload.page
            })
            .addCase(createPack.fulfilled, (state, action) => {})
            .addCase(deletePack.fulfilled, (state, action) => {})
            .addCase(updatePack.fulfilled, (state, action) => {
                console.log('updated')
            })
    },
})
export const packsActions = slice.actions
export const packsReducer = slice.reducer
export const packsThunks = { getPacks, createPack, deletePack,updatePack }
