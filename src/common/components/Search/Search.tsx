import React, { ChangeEvent, useEffect, useState } from "react"
import { InputAdornment, TextField, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useActions } from "common/hooks/useActions"
import { packsActions,} from "features/Packs/packs.slise"
import { useDebounce } from "usehooks-ts"
import { filterActions } from "features/Filter/filter.slice"
import { useSelector } from "react-redux"
import { selectFilter } from "features/Filter/filter.selector"

export const Search = () => {
    const { setSearchValue } = useActions(filterActions)
    const { packName } = useSelector(selectFilter)
    const { changePage } = useActions(packsActions)
    const [value, setValue] = useState(packName)
    const debouncedValue = useDebounce<string>(value, 500)
    const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    if (packName === "" ) {
      setValue('')
    }
  }, [packName])
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
