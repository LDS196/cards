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

export const BasicTable = () => {
    const packs = useSelector(selectPacks)
    if (!packs.length) {
        return <div>"Колоды с введенным названием не найдены. Измените параметры поиска"</div>
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right">Last Update</TableCell>
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
