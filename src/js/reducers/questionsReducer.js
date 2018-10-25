export default function reducer(state={
        questions: [],
        fetching: false,
        fetched: false,
        error: null,
    }, action) {

    switch (action.type) {
        case "FETCH_QUESTIONS": {
            return {...state, fetching: true}
        }
        case "FETCH_QUESTIONS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_QUESTIONS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                questions: action.payload,
            }
        }
    }
    return state
}
