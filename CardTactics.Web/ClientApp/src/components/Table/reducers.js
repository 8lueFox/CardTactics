import * as actions from './actions'

const INITIAL_STATE = {
    blackJackTable: []
}

const blackJackReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.SET_STARTING_HAND_BLACK_JACK:
            return {
                ...state, blackJackTable: action.item
            }
        default:
            return state;
    }
}

export default blackJackReducer