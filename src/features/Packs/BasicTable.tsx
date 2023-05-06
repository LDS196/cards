import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useSelector } from "react-redux"
import { selectPacks } from "features/Packs/packs.selector"
import { PacksActions } from "features/Packs/PacksActions"
import { FC } from "react"
import { useActions } from "common/hooks/useActions"
import { filterActions } from "features/Filter/filter.slice"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import s from "./BasicTable.module.scss"
import { selectSortBy } from "features/Filter/filter.selector"
import { cardsActions, cardsThunks } from "features/Cards/cards.slice"
import { useNavigate } from "react-router-dom"
import defaultCover from "../../assets/img/cover.jpg"

type PropsType = {}

export const BasicTable: FC<PropsType> = () => {
    const { sortPacks } = useActions(filterActions)
    const { setCardsPack_Id } = useActions(cardsActions)
    const sortBy = useSelector(selectSortBy)
    const navigate = useNavigate()
    const packs = useSelector(selectPacks)
    if (!packs.length) {
        return <div>"No packs with the entered name were found. Change your search options please!"</div>
    }
    const sortItems = (name: string) => {
        if (sortBy.sortType === "") {
            sortPacks({ name: name, sortType: "0" })
            return
        }
        if (sortBy.sortType === "0") {
            sortPacks({ name: name, sortType: "1" })
            return
        }
        if (sortBy.sortType === "1") {
            sortPacks({ name: name, sortType: "0" })
            return
        }
    }
    const getCardsHandler = (id: string) => {
        setCardsPack_Id(id)
        navigate("/cards")
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => sortItems("name")} style={{ cursor: "pointer" }}>
                            <div className={s.sortBy}>
                                <span>Name</span>
                                {sortBy.name === "name" && sortBy.sortType === "0" && <ArrowDropDownIcon />}
                                {sortBy.name === "name" && sortBy.sortType === "1" && <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell>Cover</TableCell>
                        <TableCell onClick={() => sortItems("cardsCount")} style={{ cursor: "pointer" }}>
                            <div className={s.sortBy}>
                                <span>Cards</span>
                                {sortBy.name === "cardsCount" && sortBy.sortType === "0" && <ArrowDropDownIcon />}
                                {sortBy.name === "cardsCount" && sortBy.sortType === "1" && <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => sortItems("updated")} style={{ cursor: "pointer" }}>
                            <div className={s.sortBy}>
                                <span> Last Update</span>
                                {sortBy.name === "updated" && sortBy.sortType === "0" && <ArrowDropDownIcon />}
                                {sortBy.name === "updated" && sortBy.sortType === "1" && <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell>Create by</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((p) => (
                        <TableRow key={p._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell
                                style={{ cursor: "pointer" }}
                                onClick={() => getCardsHandler(p._id)}
                                component="th"
                                scope="row"
                            >
                                {p.name}
                            </TableCell>
                            <TableCell>
                                <img src={p.deckCover ? p.deckCover : defaultCover} alt="Cover" />
                            </TableCell>
                            <TableCell>{p.cardsCount}</TableCell>
                            <TableCell>{p.updated}</TableCell>
                            <TableCell>{p.user_name}</TableCell>
                            <TableCell>
                                <PacksActions pack={p} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
