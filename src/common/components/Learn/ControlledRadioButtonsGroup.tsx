import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { FC } from "react"

type PropsType = {
    grades: string[]
    setValueHandler: (value: number) => void
}
export const ControlledRadioButtonsGroup: FC<PropsType> = ({ grades, setValueHandler }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueHandler(+(event.target as HTMLInputElement).value)
    }

    return (
        <FormControl style={{ marginTop: "20px" }}>
            <FormLabel>Rate yourself:</FormLabel>
            <RadioGroup onChange={handleChange}>
                {grades.map((el, i) => {
                    return <FormControlLabel value={i + 1} control={<Radio />} label={el} />
                })}
            </RadioGroup>
        </FormControl>
    )
}
