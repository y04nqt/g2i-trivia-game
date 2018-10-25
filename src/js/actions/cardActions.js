export function answerQuestion(input, answer, score, question) {
    return {
        type: "CORRECT",
        question: question,
        answer: answer,
        input: input,
        score: score,
    }
}

export function wrongAnswer(correctAnswer, wrongInput, originalQuestion){
    return {
        type: "WRONG",
        question: originalQuestion,
        answer: correctAnswer,
        input: wrongInput,
    }
}
