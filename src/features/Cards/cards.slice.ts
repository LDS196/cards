import {
    cardsApi,
    GradeType,
    NewCardType,
    ResponseCards,
    ResponseGradeType,
    UpdateCardType,
} from "features/Cards/cards.api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { RootState } from "app/store"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"

const getCards = createAppAsyncThunk<ResponseCards, undefined, { state: RootState }>(
    "cards/getCards",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        try {
            const { cardsTotalCount, pageCount, page, cardsPack_id } = getState().cards
            const { question, sortBy } = getState().filterCards
            const params = {
                cardQuestion: question,
                cardsPack_id,
                cardsTotalCount,
                sortCards: sortBy.sortType + sortBy.name,
                page,
                pageCount,
            }

            const res = await cardsApi.getCards({ params })
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const addNewCard = createAppAsyncThunk<void, NewCardType>("cards/addNewCard", async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await cardsApi.createCard(arg)
        return
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const deleteCard = createAppAsyncThunk<void, { id: string }>("cards/deleteCard", async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await cardsApi.deleteCard(arg.id)
        return
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const updateCard = createAppAsyncThunk<void, UpdateCardType>("cards/updateCard", async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await cardsApi.updateCard(arg)
        return
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const updateGrade = createAppAsyncThunk<ResponseGradeType, GradeType>("cards/updateGrade", async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await cardsApi.updateGrade(arg)
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})

type InitialStateType = ResponseCards & { cardsPack_id: string; packName: string }
const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: "",
    cardsPack_id: "",
    packName: "",
}
const slice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        changePageSize: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setCardsPack_Id: (state, action: PayloadAction<string>) => {
            state.cardsPack_id = action.payload
        },
        setCurrentPackName: (state, action: PayloadAction<string>) => {
            state.packName = action.payload
        },
        clearCards: (state, action: PayloadAction<InitialStateType>) => {
            return { ...state, ...action.payload }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                return { ...state, ...action.payload }
            })
            .addCase(deleteCard.fulfilled, () => {})
            .addCase(updateCard.fulfilled, () => {})
            .addCase(addNewCard.fulfilled, () => {})
    },
})

export const cardsActions = slice.actions
export const cardsReducer = slice.reducer
export const cardsThunks = { getCards, addNewCard, updateCard, deleteCard, updateGrade }
