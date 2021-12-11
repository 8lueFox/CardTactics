import * as actions from './actions'

const INITIAL_STATE = {
    blackJackTable: {
        croupier: [],
        player: []
    },
    isRequestForNewCardForCroupierIsSended: false,
    isRequestForNewTable: false
}

const blackJackReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.SET_STARTING_HAND_BLACK_JACK:
            return {
                ...state, blackJackTable: action.item
            }
        case actions.IS_REQUEST_FOR_NEW_CARD_FOR_CROUPIER_IS_SENDED:
            return {
                ...state, isRequestForNewCardForCroupierIsSended: action.item
            }
        case actions.IS_REQUEST_FOR_NEW_TABLE:
            return {
                ...state, isRequestForNewTable: action.item
            }
        default:
            return state;
    }
}

export default blackJackReducer