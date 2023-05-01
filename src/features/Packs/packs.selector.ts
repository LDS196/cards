import { useSelector } from "react-redux"
import { RootState } from "app/store"

export const selectPacks = (state:RootState)=>state.packs.cardPacks