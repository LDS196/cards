import React, { ChangeEvent, FC, useEffect, useState } from "react"
import { InputAdornment, TextField, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useDebounce } from "usehooks-ts"

type PropsType = {
    setSearchValue: (value: string) => void
    searchName: string
    changePage: (value: number) => void
}
export const Search: FC<PropsType> = (props) => {
    const { setSearchValue, searchName, changePage } = props

    const [value, setValue] = useState(searchName)
    const debouncedValue = useDebounce<string>(value, 500)
    const [firstRender, setFirstRender] = useState(true)
    useEffect(() => {
        if (searchName === "") {
            setValue("")
        }
    }, [searchName])
    useEffect(() => {
        if (!firstRender) {
            changePage(1)
            setSearchValue(value)
        }
        setFirstRender(false)
    }, [debouncedValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            <Typography component="p" sx={{ fontSize: "18px" }}>
                Search
            </Typography>
            <TextField
                onChange={handleChange}
                value={value}
                sx={{ minWidth: "400px" }}
                size={"small"}
                id="search"
                name="search"
                placeholder={"Provide your text"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}
