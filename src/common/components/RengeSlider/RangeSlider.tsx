import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { Typography } from "@mui/material"
import s from "./RangeSlider.module.scss"
import { useSelector } from "react-redux"
import { selectFilter } from "features/Filter/filter.selector"
import { useActions } from "common/hooks/useActions"
import { useDebounce } from "usehooks-ts"
import { useEffect } from "react"
import { filterActions } from "features/Filter/filter.slice"

export const RangeSlider = () => {
    const { min, max } = useSelector(selectFilter)
    const { setMinCardsCount, setMaxCardsCount } = useActions(filterActions)

    const [value, setValue] = React.useState<(number | undefined)[]>([min, max])

    const debouncedValue = useDebounce<(number | undefined)[]>(value, 500)

    useEffect(() => {
        if (typeof min === "number" && typeof max === "number") {
            setValue([min, max])
        }
    }, [min, max])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }
    useEffect(() => {
        if (typeof value[0] === "number" && typeof value[1] === "number") {
            if (max === value[1]) {
                setMinCardsCount(value[0])
                return
            }
            if (min === value[0]) {
                setMaxCardsCount(value[1])
                return
            }
            setMinCardsCount(value[0])
            setMaxCardsCount(value[1])
        }
    }, [debouncedValue])

    return (
        <Box sx={{ width: 250, display: "flex", flexDirection: "column" }}>
            <Typography component="p" sx={{ fontSize: "18px" }}>
                Number of cards
            </Typography>
            <div className={s.slider}>
                <span className={s.sliderValue}>{value[0]}</span>
                {value.some((v) => typeof v === "number") && (
                    <Slider
                        getAriaLabel={() => "Number of cards"}
                        value={value as number[]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                    />
                )}
                <span className={s.sliderValue}>{value[1]}</span>
            </div>
        </Box>
    )
}
