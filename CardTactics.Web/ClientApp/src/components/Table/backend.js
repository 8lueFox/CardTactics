import * as actions from './actions'

const getStartingHand = async () => {
    return fetch('https://localhost:7103/GetStartingHand')
        .then(response => {
            return response.json()
        })
}

const getNextPlayerCard = async (table) => {
    var body = JSON.stringify(table)
    return fetch('https://localhost:7103/DrawCardForPlayer', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: body
    }).then(response => {
        return response.json()
    })
}

const getNextCroupierCard = async (table) => {
    var body = JSON.stringify(table)
    return fetch('https://localhost:7103/DrawCardForCroupier', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: body
    }).then(response => {
        return response.json()
    })
}

export const getStartingHandBlackJack = () =>
    async (dispatch) => {
        dispatch(actions.isRequestForNewTable(true))
        const startingHand = await getStartingHand()
        dispatch(actions.setStartingHandBlackJack(startingHand))
        dispatch(actions.isRequestForNewTable(false))
    }

export const getNextCardForPlayer = (table) =>
    async (dispatch) => {
        const blackJackTable = await getNextPlayerCard(table)
        dispatch(actions.setStartingHandBlackJack(blackJackTable))
    }

export const getNextCardForCroupier = (table) =>
    async (dispatch) => {
        dispatch(actions.setIsRequestForCardForCroupierIsSended(true))
        const blackJackTable = await getNextCroupierCard(table)
        dispatch(actions.setStartingHandBlackJack(blackJackTable))
        dispatch(actions.setIsRequestForCardForCroupierIsSended(false))
    }
