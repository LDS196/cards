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
import { TableCards } from "features/Cards/TableCards"
import { filterCardsActions } from "features/Cards/Filter/filterCards.slice"
import { selectFilterCards } from "features/Cards/Filter/filterCards.selector"
import { selectIsLoading } from "app/app.select"
import { ModalAddCard } from "common/components/ModalPack/ModalsCards/ModalAddCard"

export const Cards = () => {
    const isLoading = useSelector(selectIsLoading)
    const userProfile = useSelector(selectProfile)
    const { pageCount, page, cardsTotalCount, packUserId, cards,} = useSelector(selectCards)
    const { getCards } = useActions(cardsThunks)
    const { changePageSize, changePage } = useActions(cardsActions)
    const [isShow, setIsShow] = useState(false)
    const { setSearchValue, clearFilterCards } = useActions(filterCardsActions)
    const { question, sortBy } = useSelector(selectFilterCards)
    const showModalAddCard = () => {
        setIsShow((prevState) => !prevState)
    }
    const clearFilterHandler = () => {
        clearFilterCards({
            question: "",
            sortBy: {
                name: "",
                sortType: "",
            },
        })
    }
    useEffect(() => {
        getCards({})
    }, [pageCount, page, question, sortBy.name, sortBy.sortType])

    const titleCards = userProfile?._id === packUserId ? "MyPack" : "Friends Pack"

    // if (isLoading) {
    //     return <Back title={"Back to Pack List"} link={""} clearFilterHandler={clearFilterHandler} />
    // }
    return (
        <div>
            <Back title={"Back to Pack List"} link={""} clearFilterHandler={clearFilterHandler} />
            <div className={s.block}>
                <Typography component="h1" variant="h5">
                    {titleCards}
                </Typography>
                {userProfile?._id === packUserId && (
                    <Button disabled={isLoading} onClick={() => showModalAddCard()} variant="contained">
                        Add new Card
                    </Button>
                )}
            </div>

            <div className={s.block}>
                {cards.length || question ? (
                    <Search searchName={question} setSearchValue={setSearchValue} changePage={changePage} />
                ) : (
                    <p style={{ color: "green" }}>
                        This pack is empty!
                        {userProfile?._id !== packUserId ? " Check another pack please!" : " Add new cards"}
                    </p>
                )}
            </div>

            <TableCards />
            <Paginator
                totalCount={cardsTotalCount}
                page={page}
                changePage={changePage}
                changePageSize={changePageSize}
            />

            {isShow && <ModalAddCard showModalAddCard={showModalAddCard} />}
        </div>
    )
}
