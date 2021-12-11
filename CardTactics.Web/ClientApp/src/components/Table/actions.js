export const SET_USER_CHOICE = "SET_USER_CHOICE"
export const setUserChoice = item => ({
    type: SET_USER_CHOICE, item
})

export const SET_STARTING_HAND_BLACK_JACK = "SET_STARTING_HAND_BLACK_JACK"
export const setStartingHandBlackJack = item => ({
    type: SET_STARTING_HAND_BLACK_JACK, item
})

export const IS_REQUEST_FOR_NEW_CARD_FOR_CROUPIER_IS_SENDED = "IS_REQUEST_FOR_NEW_CARD_FOR_CROUPIER_IS_SENDED"
export const setIsRequestForCardForCroupierIsSended = item => ({
    type: IS_REQUEST_FOR_NEW_CARD_FOR_CROUPIER_IS_SENDED, item
})

export const IS_REQUEST_FOR_NEW_TABLE = "IS_REQUEST_FOR_NEW_TABLE"
export const isRequestForNewTable = item => ({
    type: IS_REQUEST_FOR_NEW_TABLE, item
})