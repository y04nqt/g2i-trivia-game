import React from "react"
import { connect } from "react-redux"
// Need html-entities to decode given entities from the data
import entities from "html-entities"

import { answerQuestion, wrongAnswer } from "../actions/cardActions"

@connect((store) => {
    return {
        cards: store.cards,
    };
})
export default class TriviaCard extends React.Component {

    constructor(props){
        super(props);
        // show our first question by default
        this.state = {
            showCard: "question-1"
        }
    }

    showNextQuestion(index) {
        // if index equals length of questions, we have pass the final question
        // time to show results, set showCard back to default
        if(index == this.props.questions.length) {
            return this.setState({showCard: 'question-1'});
        }
        index++;
        return this.setState({showCard: 'question-'+index});
    }

    // XXX: define our answer functions for true and false
    // Current set up is kind of dirty but works
    trueAnswer(answer, score, correctAnswer, wrongAnswerData, originalQuestion, index) {
        this.showNextQuestion(index);
        if(answer === JSON.parse(correctAnswer.toLowerCase())){
            return this.props.dispatch(answerQuestion(true, true, score, originalQuestion));
        }
        return this.props.dispatch(wrongAnswer(correctAnswer, answer, originalQuestion));
    }

    falseAnswer(answer, score, correctAnswer, wrongAnswerData, originalQuestion, index) {
        this.showNextQuestion(index);
        if(answer === JSON.parse(correctAnswer.toLowerCase())){
            return this.props.dispatch(answerQuestion(false, false, score, originalQuestion));
        }
        return this.props.dispatch(wrongAnswer(correctAnswer, answer, originalQuestion));
    }

    // Reload the window to restart the game
    replay(){
        window.location.reload();
    }

    render() {
        // XXX: using ++index in order to increment the number before setting it
        // index++ would render the first question id to be question-1 while
        // the key would be ...question-0
        const mappedQuestions = this.props.questions.map((question, index) => 
            <li key={'question-'+ ++index} id={'question-'+index} className={(this.state.showCard == "question-"+index)? "show" : "hide"}>
                <h1>{question.category}</h1>
                <h3 className="uppercase margin16Auto fontSize24">{question.difficulty}</h3>
                <section className="questionSection">
                    <h2 className="margin16Auto fontSize24">{entities.AllHtmlEntities.decode(question.question)}</h2>
                    <h3 className="fontSize18 questionCounter">{index} of {this.props.questions.length}</h3>
                </section>
                <footer className="questionFooter">
                    <button onClick={() => this.trueAnswer(
                        true,
                        1,
                        question.correct_answer,
                        question.incorrect_answers[0],
                        entities.AllHtmlEntities.decode(question.question),
                        index)}
                        className="answerBtns">True</button>
                    <button onClick={() => this.falseAnswer(
                        false, 
                        1, 
                        question.correct_answer,
                        question.incorrect_answers[0],
                        entities.AllHtmlEntities.decode(question.question),
                        index)}
                        className="answerBtns">False</button>
                </footer>
            </li>
        )
        // return our results if we have answered all the questions!
        if (this.props.cards.answers.length == this.props.questions.length) {
            const mappedResults = this.props.cards.answers.map((result, index) =>
                <li key={'result='+index} className={(result.input == result.answer) ? 'correct' : 'incorrect'}>
                    <h2><i class="material-icons marginRight16 inlineBlock vAlignTextTop">{ (result.input == result.answer) ? 'add' : 'clear'}</i>{result.question}</h2>
                    <h4>{(result.input == result.answer) ? 'Correct' : 'Incorrect'}</h4>
                </li>
            )
            return(
                <div>
                    <h1 class="marginTop0 paddingTop16">You scored</h1>
                    <h2>{this.props.cards.score}&nbsp;/&nbsp;{this.props.cards.answers.length}</h2>
                    <ul id="mapped-results">
                        {mappedResults}
                    </ul>
                    <button id="play-again" onClick={this.replay.bind(this)}>Play Again?</button>
                </div>
            )
        }
        // return our questions!
        return(
            <div>
                <ul id="mapped-questions">{mappedQuestions}</ul>
            </div>
        )
    }
}
