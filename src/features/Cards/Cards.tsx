import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useActions } from "common/hooks/useActions"
import s from "features/Packs/Packs.module.scss"
import { Button, Typography } from "@mui/material"
import { Search } from "common/components/Search/Search"
import { Paginator } from "common/components/Paginator/Paginator"
import { selectCards } from "features/Cards/cards.selector"
import { cardsActions, cardsThunks } from "features/Cards/cards.slice"
import { selectProfile } from "features/Profile/profile.select"
import Back from "common/components/Back"
import { TableCards } from "features/Cards/TableCards/TableCards"
import { filterCardsActions } from "features/Cards/FilterCards/filterCards.slice"
import { selectFilterCards } from "features/Cards/FilterCards/filterCards.selector"
import { selectIsLoading } from "app/app.select"
import { ModalAddCard } from "common/components/ModalWindows/ModalsCards/ModalAddCard"
import { clearCardsUtils } from "common/utils/clear-cards-util"
import { useParams } from "react-router-dom"

export const Cards = () => {
    const isLoading = useSelector(selectIsLoading)
    const userProfile = useSelector(selectProfile)
    const { pageCount, page, cardsTotalCount, packUserId, cards, packName } = useSelector(selectCards)
    const { getCards } = useActions(cardsThunks)
    const { changePageSize, changePage, clearCards, setCardsPack_Id } = useActions(cardsActions)
    const [isShow, setIsShow] = useState(false)
    const { setSearchValue, clearFilterCards } = useActions(filterCardsActions)
    const { question, sortBy } = useSelector(selectFilterCards)
    const params = useParams()
    console.log(params.id)

    const showModalAddCard = () => {
        setIsShow(true)
    }
    const hideModalAddCard = () => {
        setIsShow(false)
    }
    const clearFilterHandler = () => {
        clearFilterCards({ question: "", sortBy: { name: "", sortType: "" } })
        clearCards(clearCardsUtils())
    }
    useEffect(() => {
        setCardsPack_Id(params?.id !== undefined ? params.id : "")
    }, [])

    useEffect(() => {
        getCards({})
    }, [pageCount, page, question, sortBy.name, sortBy.sortType])

    const titleCards = userProfile?._id === packUserId ? `My Pack: ${packName}` : `Friends Pack: ${packName}`
    return (
        <div>
            <Back title={"Back to Pack List"} link={""} clearFilterHandler={clearFilterHandler} />
            <div className={s.block}>
                <Typography component="h1" variant="h5">
                    {!isLoading && titleCards}
                </Typography>
                {userProfile?._id === packUserId && (
                    <Button disabled={isLoading} onClick={() => showModalAddCard()} variant="contained">
                        Add new Card
                    </Button>
                )}
            </div>

            <div className={s.block}>
                <Search searchName={question} setSearchValue={setSearchValue} changePage={changePage} />
            </div>
            <TableCards />
            {!cards.length && !isLoading && (
                <p style={{ color: "green" }}>
                    This pack is empty!
                    {userProfile?._id !== packUserId ? " Check another pack please!" : " Add new cards"}
                </p>
            )}
            <Paginator
                totalCount={cardsTotalCount}
                page={page}
                changePage={changePage}
                changePageSize={changePageSize}
            />

            {isShow && <ModalAddCard hideModalAddCard={hideModalAddCard} />}
        </div>
    )
}
