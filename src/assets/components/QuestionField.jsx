import React from "react";

export default function QuestionField(props) {
    const {incorrect, correct} = props.trivia
    const question = props.trivia.question.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'");
    const correctAnswer = props.trivia.correct_answer;
    const answers = [...props.trivia.incorrect_answers, correctAnswer];

    //console.log(typeof question.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'"))
    return (
        <div className="question">
            <p className="text">{question}</p>
            <ul className="answers">
                {
                    answers.map((answer, idx) => {
                        return (
                            <li key={idx} className="option">
                                <label  htmlFor={`q1-a${idx}`}>{answer}</label>
                                <input type="radio" name="quetion-1" id={`q1-a${idx}`} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}