export default function reducer(state={
        score: 0,
        answers: []
    }, action) {

    switch (action.type) {
        case "CORRECT": {
            return {
                ...state,
                answers: state.answers.concat({
                    question: action.question,
                    input: action.input,
                    answer: action.answer,
                }),
                score: state.score + action.score,
            }
        }
        case "WRONG": {
            return {
                ...state,
                answers: state.answers.concat({
                    question: action.question,
                    input: action.input,
                    answer: action.answer
                })
            }
        }
    }
    return state
}
