import React from "react";

export default function QuestionField(props) {
    const question = props.data.question.replaceAll("&quot;", "\"").replaceAll("&#039;", "\'");
    //const correctAnswer = props.trivia.correct_answer;
    //const answers = [...props.trivia.incorrect_answers, correctAnswer]//.sort((a, b) => 0.5 - Math.random());
    const answers = props.data.answers

    function setClassName() {


    }


    return (
        <div className="question" id={props.id}>
            <p className="text">{question}</p>
            <ul className="answers">
                {
                    answers.map((answer, idx) => {
                        return (
                            <li 
                                key={idx} 
                                className={answer.isHeld ? "selected option" : "option" }                                
                            >
                                
                                <label 
                                    className="label" 
                                    htmlFor={`q${props.id}-a${idx}`}
                                >{answer.value}</label>

                                <input 
                                    className="input"
                                    type="radio" 
                                    id={`q${props.id}-a${idx}`} 
                                    name={props.id}
                                    value={answer.value}
                                    onClick={props.handleAnswers}
                                    //checked={console.log(`q${props.id}-a${idx}`)}
                                />
                            </li>
                        )
                    })
                }
            </ul>
            <hr />
        </div>
    )
}