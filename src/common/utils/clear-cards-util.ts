// function return object for clearing state after user go out cards page
export const clearCardsUtils = () => {
    return {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 1,
        pageCount: 10,
        packUserId: "",
        cardsPack_id: "",
        packName: "",
    }
}
