import React, { FC, useState } from "react"
import { Box, Button, FormControl, InputLabel,
    MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "common/components/ModalPack/Modal.module.scss"
import { useForm } from "react-hook-form"
import { useActions } from "common/hooks/useActions"
import { cardsThunks } from "features/Cards/cards.slice"
import { InputTypeFile } from "common/components/InputTypeFile/InputTypeFile"
import { CardType } from "features/Cards/cards.api"

type PropsType = {
    showModalUpdateCard: () => void
    card:CardType
}
type FormType = {
    question: string
    answer: string
}
export const ModalEditCard: FC<PropsType> = ({showModalUpdateCard,card }) => {
const {updateCard}= useActions(cardsThunks)


    const [type, setType] = useState("text")
    const [type1, setType1] = useState("text")
    const [answerImg, setAnswerImg] = useState(card.answerImg)
    const [questionImg, setQuestionImg] = useState(card.questionImg)
    const setAnswerImgHandler = (value: string) => {
        setAnswerImg(value)
    }
    const setQuestionImgHandler = (value: string) => {
        setQuestionImg(value)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string)
    }
    const handleChange1 = (event: SelectChangeEvent) => {
        setType1(event.target.value as string)
    }

    const {
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm<FormType>({
        defaultValues: {
            question: "",
            answer: "",
        },
        mode: "onChange",
    })
    const onSubmit = (data: FormType) => {
        updateCard({
            card: {
                _id: card._id,
                answer: data.answer,
                question: data.question,
                answerImg: answerImg,
                questionImg: questionImg,
            },
        })
          .unwrap()
          .then(() => showModalUpdateCard())
    }
    return (
      <div className={s.modalWrapper}>
          <Paper
            elevation={3}
            sx={{
                maxWidth: "350px",
                width: "100%",
            }}
          >
              <div className={s.modal}>
                  <div className={s.title}>
                      <Typography component="p" sx={{ fontSize: "18px" }}>
                          Add new Card
                      </Typography>
                      <button onClick={showModalUpdateCard}>
                          <CloseIcon />
                      </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                      <Box>
                          <FormControl fullWidth>
                              <InputLabel id="elect-label">Type Question</InputLabel>
                              <Select labelId="select-label" value={type} label="type" onChange={handleChange}>
                                  <MenuItem value={"text"}>Text</MenuItem>
                                  <MenuItem value={"image"}>Image</MenuItem>
                              </Select>
                          </FormControl>
                      </Box>
                      {type === "text" ? (
                        <>
                            <TextField
                              {...register("question", {
                                  required: true,
                                  minLength: { value: 3, message: "Min length 3 symbols" },
                              })}
                              fullWidth
                              label="Question"
                              variant="standard"
                              name={"question"}
                              type={"text"}
                            />
                            <div className={s.error}>
                                {errors?.question && <p>{errors?.question?.message || "Error"}</p>}
                            </div>
                        </>
                      ) : (
                        <InputTypeFile
                          title={"Question"}
                          nameButton={"Add Image Question"}
                          callback={setQuestionImgHandler}
                          cover={questionImg}
                        />
                      )}

                      <Box>
                          <FormControl fullWidth>
                              <InputLabel id="select-label">Type Answer</InputLabel>
                              <Select labelId="select-label" value={type1} label="type1" onChange={handleChange1}>
                                  <MenuItem value={"text"}>Text</MenuItem>
                                  <MenuItem value={"image"}>Image</MenuItem>
                              </Select>
                          </FormControl>
                      </Box>
                      {type1 === "text" ? (
                        <>
                            <TextField
                              {...register("answer", {
                                  required: true,
                                  minLength: { value: 1, message: "Min length 1 symbols" },
                              })}
                              fullWidth
                              label="Answer"
                              variant="standard"
                              name={"answer"}
                              type={"text"}
                            />
                            <div className={s.error}>
                                {errors?.answer && <p>{errors?.answer?.message || "Error"}</p>}
                            </div>
                        </>
                      ) : (
                        <InputTypeFile
                          title={"Answer"}
                          nameButton={"Add Image Answer"}
                          callback={setAnswerImgHandler}
                          cover={answerImg}
                        />
                      )}
                      <div className={s.modalButtons}>
                          <Button onClick={showModalUpdateCard} variant="outlined" sx={{ mt: 3, mb: 2 }}>
                              Cancel
                          </Button>
                          <Button
                            // disabled={!isDirty || !isValid}
                            type="submit"
                            color={"primary"}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                              Save
                          </Button>
                      </div>
                  </form>
              </div>
          </Paper>
      </div>
    )
}
