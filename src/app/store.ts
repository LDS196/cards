import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import { appReducer } from "app/app.slice"
import { authReducer } from "features/auth/auth.slice"
import { packsReducer } from "features/Packs/packs.slise"
import { filterReducer } from "features/Packs/FilterPacks/filter.slice"
import { cardsReducer } from "features/Cards/cards.slice"
import { filterCardsReducer } from "features/Cards/FilterCards/filterCards.slice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const filterPersistConfig = {
    key: "filter",
    storage,
}
const filterCardsPersistConfig = {
    key: "filterCards",
    storage,
}
const rootReducer = combineReducers({
    filter: persistReducer(filterPersistConfig, filterReducer),
    filterCards: persistReducer(filterCardsPersistConfig, filterCardsReducer),
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
