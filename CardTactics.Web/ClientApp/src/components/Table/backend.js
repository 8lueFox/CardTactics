import * as actions from './actions'

const getStartingHand = async () => {
    return fetch('https://localhost:7103/GetStartingHand')
        .then(response => {
            return response.json()
        })
}

export const getStartingHandBlackJack = () =>
    async (dispatch) => {
        const startingHand = await getStartingHand()

        dispatch(actions.setStartingHandBlackJack(startingHand))
    }
