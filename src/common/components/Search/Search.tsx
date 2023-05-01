import React, { ChangeEvent, useEffect, useState } from "react"
import { InputAdornment, TextField, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { useDebounce } from "usehooks-ts"

export const Search = () => {
    const { getPacks } = useActions(packsThunks)
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        getPacks({
            params: {
                packName: value,
            },
        })
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
                sx={{minWidth: '400px'}}
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
