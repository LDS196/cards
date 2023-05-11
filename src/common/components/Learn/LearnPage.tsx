import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { CardType } from "features/Cards/cards.api"
import { selectCards } from "features/Cards/cards.selector"
import { useActions } from "common/hooks/useActions"
import { cardsThunks } from "features/Cards/cards.slice"
import s from "common/components/Learn/LearnPage.module.scss"
import { selectIsLoading } from "app/app.select"
import { ControlledRadioButtonsGroup } from "common/components/Learn/ControlledRadioButtonsGroup"
import Back from "common/components/Back"
import { getCard } from "common/utils/get-card-util"

const grades = ["Didn't know", "Forgot", "A lot of thought", "Confused", "Knew the answer"]

const LearnPage = () => {
    const isLoading = useSelector(selectIsLoading)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    let { cards, packName } = useSelector(selectCards)
    const { cardsPack_id } = useSelector(selectCards)
    const { getCards, updateGrade } = useActions(cardsThunks)
    const [card, setCard] = useState<CardType>({
        _id: "fake",
        cardsPack_id: "",
        answer: "answer fake",
        question: "question fake",
        grade: 0,
        shots: 0,
        answerImg: "",
        questionImg: "",
        type: "",
        rating: 0,
        more_id: "",
        created: "",
        updated: "",
        user_id: "",
    })
    const [value, setValue] = useState(0)
    const setValueHandler = (value: number) => {
        setValue(value)
    }
    useEffect(() => {
        if (first) {
            getCards({})
            setFirst(false)
        }
        if (cards.length > 0) setCard(getCard(cards))

        return () => {}
    }, [cardsPack_id, cards, first])

    const onNext = () => {
        setIsChecked(false)

        if (cards.length > 0) {
            updateGrade({ grade: value, card_id: card._id })
                .unwrap()
                .then((res) => {
                    cards.map((card) => {
                        return card._id === res.updatedGrade.card_id ? { ...card, grade: res.updatedGrade.grade } : card
                    })
                })
                .then(() => setCard(getCard(cards)))
        } else {
        }
    }

    return (
        <>
            {!isLoading && (
                <>
                    <Back title={"Back to Pack List"} link={""} />
                    <Container component="main" maxWidth="xs">
                        <Typography style={{ textAlign: "center" }} component="h1" variant="h5">
                            Learn : {packName}
                        </Typography>
                        <Paper elevation={3} style={{ padding: "10px" }}>
                            <Box className={s.box}>
                                <div>
                                    <span>
                                        <b>Question:</b>
                                    </span>
                                    {card.questionImg ? (
                                        <div className={s.learnImg}>
                                            <img src={card.questionImg} alt="" />
                                        </div>
                                    ) : (
                                        <span>{card.question}</span>
                                    )}
                                </div>
                                <div className={s.button}>
                                    {!isChecked && (
                                        <Button
                                            variant="contained"
                                            style={{ width: "150px" }}
                                            onClick={() => setIsChecked(true)}
                                        >
                                            Show answer
                                        </Button>
                                    )}
                                </div>

                                {isChecked && (
                                    <>
                                        <div>
                                            <span>
                                                <b>Answer:</b>
                                            </span>
                                            {card.answerImg ? (
                                                <div className={s.learnImg}>
                                                    <img src={card.answerImg} alt="" />
                                                </div>
                                            ) : (
                                                <span>{card.answer}</span>
                                            )}
                                        </div>
                                        <ControlledRadioButtonsGroup
                                            setValueHandler={setValueHandler}
                                            grades={grades}
                                        />
                                        <div className={s.button}>
                                            <Button disabled={!cards.length} variant="contained" onClick={onNext}>
                                                next
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Box>
                        </Paper>
                    </Container>
                </>
            )}
        </>
    )
}

export default LearnPage
