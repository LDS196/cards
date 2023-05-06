import { cardsApi, ChangedCardType, NewCardType, ResponseCards, UpdateCardType } from "features/Cards/cards.api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { RootState } from "app/store"

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
        } catch (e: any) {
            return rejectWithValue(null)
        }
    }
)
const addNewCard = createAppAsyncThunk<void, NewCardType>("cards/addNewCard", async (arg, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await cardsApi.createCard(arg)
        dispatch(getCards())
        return
    } catch (e: any) {
        return rejectWithValue(null)
    }
})
const deleteCard = createAppAsyncThunk<void, { id: string }>("cards/deleteCard", async (arg, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await cardsApi.deleteCard(arg.id)
        dispatch(getCards())
        return
    } catch (e: any) {
        return rejectWithValue(null)
    }
})
const updateCard = createAppAsyncThunk<void, UpdateCardType>("cards/updateCard", async (arg, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await cardsApi.updateCard(arg)
        dispatch(getCards())
        return
    } catch (e: any) {
        return rejectWithValue(null)
    }
})

type InitialStateType = ResponseCards & { cardsPack_id: string }
const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: "",
    cardsPack_id: "",
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                return { ...state, ...action.payload }
            })
            .addCase(deleteCard.fulfilled, (state, action) => {})
            .addCase(updateCard.fulfilled, (state, action) => {})
            .addCase(addNewCard.fulfilled, (state, action) => {})
    },
})

export const cardsActions = slice.actions
export const cardsReducer = slice.reducer
export const cardsThunks = { getCards, addNewCard, updateCard, deleteCard }
