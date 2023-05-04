import { RootState } from "app/store"

export const selectFilter = (state:RootState)=>state.filter
export const selectSortBy = (state:RootState)=>state.filter.sortBy