import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Container,Paper, Typography } from "@mui/material"
import { CardType } from "features/Cards/cards.api"
import { selectCards } from "features/Cards/cards.selector"
import { useActions } from "common/hooks/useActions"
import {  cardsThunks } from "features/Cards/cards.slice"
import s from "./LearnPage.module.scss"
import { selectIsLoading } from "app/app.select"

const grades = ["не знал", "забыл", "долго думал", "перепутал", "знал"]

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return { sum: newSum, id: newSum < rand ? i : acc.id }
        },
        { sum: 0, id: -1 }
    )
    console.log("test: ", sum, rand, res)

    return cards[res.id + 1]
}

const LearnPage = () => {
    const isLoading = useSelector(selectIsLoading)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    // const [first, setFirst] = useState<boolean>(0);
    const { cards, packName } = useSelector(selectCards)
    const { cardsPack_id } = useSelector(selectCards)
    const { getCards } = useActions(cardsThunks)
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

    const dispatch = useDispatch()
    useEffect(() => {
        console.log("LearnContainer useEffect")

        if (first) {
            getCards({})
            setFirst(false)
        }

        console.log("cards", cards)
        if (cards.length > 0) setCard(getCard(cards))

        return () => {
            console.log("LearnContainer useEffect off")
        }
    }, [dispatch, cardsPack_id, cards, first])

    const onNext = () => {
        setIsChecked(false)

        if (cards.length > 0) {
            setCard(getCard(cards))
        } else {
        }
    }

    return (
      <>
          {!isLoading &&  <Container component="main" maxWidth="xs">
              <Typography style={{textAlign:'center'}} component="h1" variant="h5">
                  Learn : {packName}
              </Typography>
              <Paper elevation={3} style={{ padding: "10px" }}>
                  <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                  >

                      <div>
                          <span>Question:</span>
                          {card.questionImg ? <div className={s.learnImg}><img  src={card.questionImg} alt="" /></div> : <span>{card.question}</span>}
                      </div>
                      <div>
                          <Button onClick={() => setIsChecked(true)}>check</Button>
                      </div>
                      {isChecked &&<>
                          <div>
                              <span>Answer:</span>
                              {card.answerImg ? <div className={s.learnImg}><img src={card.answerImg} alt="" /></div> : <span>{card.answer}</span>}
                          </div>
                          {grades.map((g, i) => (
                            <Button variant={"contained"} key={'grade-' + i} onClick={() => {}}>{g}</Button>
                          ))}

                          <div><Button onClick={onNext}>next</Button></div>
                      </>}
                  </Box>
              </Paper>
          </Container> }
      </>

    )
}

export default LearnPage
