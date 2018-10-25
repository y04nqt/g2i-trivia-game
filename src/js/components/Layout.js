import React from "react"
import { connect } from "react-redux"

import { fetchQuestions } from "../actions/questionsActions"

import TriviaCard from "./TriviaCard"

@connect((store) => {
    return {
        questions: store.questions,
    };
})
export default class Layout extends React.Component {

    fetchQuestions() {
        this.props.dispatch(fetchQuestions())
    }

    render() {
        const { questions, cards } = this.props
        // Let's render our starting screen
        if (!questions.questions.length) {
            return (
                <div id="start-screen">
                    <h1 id="start-screen-title">Welcome to the Trivia Challenge!</h1>
                    <section id="start-screen-section">
                        <h3>You will be presented with 10 True or False questions.</h3>
                        <h3>Can you score 100%?</h3>
                    </section>
                    <button id="begin-btn" className="btnBottom" onClick={this.fetchQuestions.bind(this)}>Begin</button>
                </div>
            )
        }
        // if the user has started, let's return the TriviaCard Component
        return(
            <div>
                <TriviaCard questions={this.props.questions.questions} />
            </div>
        )
    }
}
