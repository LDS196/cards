
import { RootState } from "app/store"

export const selectPacks = (state:RootState)=>state.packs.cardPacks
export const selectPage = (state:RootState)=>state.packs.page
export const selectPageCount= (state:RootState)=>state.packs.pageCount