import { combineReducers } from "redux"

import questions from "./questionsReducer"
import cards from "./cardReducer"

export default combineReducers({
    questions,
    cards,
})
