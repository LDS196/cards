
import { RootState } from "app/store"

export const selectPacks = (state:RootState)=>state.packs.cardPacks
export const selectPage = (state:RootState)=>state.packs.page
export const selectPageCount= (state:RootState)=>state.packs.pageCount
export const selectMinCardsCount= (state:RootState)=>state.packs.minCardsCount
export const selectMaxCardsCount= (state:RootState)=>state.packs.maxCardsCount