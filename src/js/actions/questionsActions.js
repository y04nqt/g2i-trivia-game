import axios from "axios";

export function fetchQuestions() {
    return function(dispatch) {
        dispatch({type: "FETCH_QUESTIONS"});

        axios.get("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
            .then((response) => {
                dispatch({type: "FETCH_QUESTIONS_FULFILLED", payload: response.data.results})
            })
            .catch((err) => {
                dispatch({type: "FETCH_QUESTIONS_REJECTED", payload: err})
            })
    }
}