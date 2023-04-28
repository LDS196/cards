import { AppDispatch, RootState } from "app/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

/**
 Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
    rejectValue: unknown
}>()

export type RejectValueType = {
    data: ResponseType
    showGlobalError: boolean
}
