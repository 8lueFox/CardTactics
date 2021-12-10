import { combineReducers } from 'redux'
import blackJackReducer from './components/Table'

const rootReducer = combineReducers({
    blackJack: blackJackReducer
})

export default rootReducer