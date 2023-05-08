import { instance } from "common/api/common.api"

export const cardsApi = {
    getCards(data: CardsParamsType) {
        return instance.get<ResponseCards>("cards/card", data)
    },
    createCard(data: NewCardType) {
        return instance.post<ChangedCardType>("/cards/card", data)
    },
    deleteCard(id: string) {
        return instance.delete<ChangedCardType>(`/cards/card?id=${id}`)
    },
    updateCard(data: UpdateCardType) {
        return instance.put<ChangedCardType>("/cards/card", data)
    },
    updateGrade(data: GradeType) {
        return instance.put<ResponseGradeType>("/cards/grade", data)
    },
}
export type GradeType = {
    grade: number
    card_id: string
}
export type ResponseGradeType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}
export type CardsParamsType = {
    params: {
        cardAnswer?: string
        cardQuestion?: string
        cardsPack_id: string
        min?: number
        max?: number
        sortCards?: string
        page?: number
        pageCount?: number
    }
}
export type ResponseCards = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
    answerImg: string
    questionImg: string
    type: string
    rating: number
    more_id: string
}
export type ChangedCardType = {
    newCard?: {}
    deletedCard?: {}
    updatedCard?: {}
}
export type NewCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}
export type UpdateCardType = {
    card: {
        _id: string
        question?: string
        answer?: string
        answerImg?: string
        questionImg?: string
    }
}
