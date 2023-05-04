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
import { EditPack } from "features/Packs/EditPack"
import { FC } from "react"
import { useActions } from "common/hooks/useActions"
import { filterActions } from "features/Filter/filter.slice"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import s from './BasicTable.module.scss'
import { selectSortBy } from "features/Filter/filter.selector"
type PropsType = {}
export const BasicTable: FC<PropsType> = () => {
    const { sortPacks } = useActions(filterActions)
    const sortBy= useSelector(selectSortBy)

    const packs = useSelector(selectPacks)
    if (!packs.length) {
        return <div>"Колоды с введенным названием не найдены. Измените параметры поиска"</div>
    }
    const sortItems = (name: string) => {
        if (sortBy.sortType === "") {
            sortPacks({ name: name, sortType: '0' })
        }
        if (sortBy.sortType === '0') {
            sortPacks({ name: name, sortType: '1' })
        }
        if (sortBy.sortType === '1') {
            sortPacks({ name: name, sortType: '0' })
        }
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell
                          onClick={()=>sortItems('name')} style={{cursor:'pointer'}}>
                            <div className={s.sortBy}>
                                <span>Name</span>
                                {sortBy.name === "name" && sortBy.sortType === '0' && <ArrowDropDownIcon/>}
                                {sortBy.name === "name" && sortBy.sortType === '1' &&   <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell
                          onClick={()=>sortItems('cardsCount')}
                          align="right"
                          style={{cursor:'pointer'}}>
                            <div className={s.sortBy}>
                                <span>Cards</span>
                                {sortBy.name === "cardsCount" && sortBy.sortType === '0' && <ArrowDropDownIcon/>}
                                {sortBy.name === "cardsCount" && sortBy.sortType === '1' &&   <ArrowDropUpIcon />}
                            </div>
                        </TableCell>
                        <TableCell
                          onClick={()=>sortItems('updated')}
                          align="right"
                          style={{cursor:'pointer'}}>
                            <div className={s.sortBy}>
                                <span> Last Update</span>
                                {sortBy.name === "updated" && sortBy.sortType === '0' && <ArrowDropDownIcon/>}
                                {sortBy.name === "updated" && sortBy.sortType === '1' &&   <ArrowDropUpIcon/>}
                            </div>
                        </TableCell>
                        <TableCell align="right">Create by</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((p) => (
                        <TableRow key={p._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {p.name}
                            </TableCell>
                            <TableCell align="right">{p.cardsCount}</TableCell>
                            <TableCell align="right">{p.updated}</TableCell>
                            <TableCell align="right">{p.user_name}</TableCell>
                            <TableCell align="right">
                                <EditPack pack={p} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
