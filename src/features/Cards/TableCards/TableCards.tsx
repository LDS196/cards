import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useSelector } from "react-redux"
import { FC } from "react"
import { useActions } from "common/hooks/useActions"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import s from "features/Cards/TableCards/TableCards.module.scss"
import { Rating } from "@mui/material"
import { selectCards } from "features/Cards/cards.selector"
import { selectProfile } from "features/Profile/profile.select"
import { CardsActions } from "features/Cards/ActionCards/CardsActions"
import { filterCardsActions } from "features/Cards/FilterCards/filterCards.slice"
import { selectFilterCards } from "features/Cards/FilterCards/filterCards.selector"

type PropsType = {}

export const TableCards: FC<PropsType> = () => {
    const userProfile = useSelector(selectProfile)
    const { packUserId, cards } = useSelector(selectCards)
    const { question, sortBy } = useSelector(selectFilterCards)
    const { sortCards } = useActions(filterCardsActions)
    if (!cards.length && !!question.length) {
        return <div>"Cards with the entered name were not found. Change your search options please!"</div>
    }

    const sortItems = (name: string) => {
        if (sortBy.sortType === "") {
            sortCards({ name: name, sortType: "0" })
            return
        }
        if (sortBy.sortType === "0") {
            sortCards({ name: name, sortType: "1" })
            return
        }
        if (sortBy.sortType === "1") {
            sortCards({ name: name, sortType: "0" })
            return
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => sortItems("question")} style={{ cursor: "pointer" }}>
                            <div className={s.sortBy}>
                                <span>Question</span>
                                {sortBy.name === "question" && sortBy.sortType === "0" && <ArrowDropDownIcon />}
                                {sortBy.name === "question" && sortBy.sortType === "1" && <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => sortItems("answer")} style={{ cursor: "pointer" }}>
                            <div className={s.sortBy}>
                                <span>Answer</span>
                                {sortBy.name === "answer" && sortBy.sortType === "0" && <ArrowDropDownIcon />}
                                {sortBy.name === "answer" && sortBy.sortType === "1" && <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => sortItems("updated")} style={{ cursor: "pointer" }}>
                            <div className={s.sortBy}>
                                <span> Last Update</span>
                                {sortBy.name === "updated" && sortBy.sortType === "0" && <ArrowDropDownIcon />}
                                {sortBy.name === "updated" && sortBy.sortType === "1" && <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell>Grade</TableCell>
                        {userProfile?._id === packUserId && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((card) => (
                        <TableRow key={card._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {card.questionImg ? <img src={card.questionImg} alt="question" /> : card.question}
                            </TableCell>
                            <TableCell>
                                {card.answerImg ? <img src={card.answerImg} alt="question" /> : card.answer}
                            </TableCell>
                            <TableCell>{card.updated}</TableCell>
                            <TableCell>
                                <Rating
                                    readOnly
                                    name="rating"
                                    value={card.grade === 0 ? 1 : card.grade}
                                    precision={0.1}
                                />
                            </TableCell>
                            {userProfile?._id === packUserId && (
                                <TableCell>
                                    <CardsActions card={card} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
